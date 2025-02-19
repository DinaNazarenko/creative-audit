<script setup>
import { CREATIVE_OPTIONS } from '@/lib/constants'
import { useAuditedCreativesStore } from '@/stores/auditedCreatives'
import { useErrorStore } from '@/stores/errorInfo'
import CreativeStatus from '@/components/common/CreativeStatus.vue'
import CommentInfo from '@/components/CreativePage/CommentInfo.vue'
import ButtonOutline from '@/components/common/ButtonOutline.vue'
import ButtonChange from '@/components/common/ButtonChange.vue'
import QuestionCircleIcon from '@/components/icons/QuestionCircleIcon.vue'
import FullscreenIcon from '@/components/icons/FullscreenIcon.vue'
import { getImageSize, getVideoSize } from '@/lib/utils/getSize'
import { formatDate } from '@/lib/utils/FormattingDates'
import { useMediaSlideStore } from '@/stores/mediaPagination'
import { formatOptions } from '@/lib/utils/formatOptions'
import { ref, watchEffect, computed } from 'vue'

const props = defineProps({
  creative: {
    type: Object,
    default: () => ({
      media: [],
    }),
  },
})

const medias = ref([])
const currentCreative = ref({})

watchEffect(() => {
  medias.value = props.creative?.media || []
  currentCreative.value = props.creative
})

const creativeOptions = ref(CREATIVE_OPTIONS)
const size = ref(null)
const fullScreenImage = ref(null)
const fullscreenStatus = ref(false)

const auditedCreativesStore = useAuditedCreativesStore()
const errorStore = useErrorStore()
const mediaSlideStore = useMediaSlideStore()

const currentSlide = computed(() => mediaSlideStore.currentSlide)

const currentMedia = computed(() => {
  const index = Number(currentSlide.value)
  return medias.value?.[index]
})

const auditedMedia = computed(() => ({
  ...currentCreative.value?.media,
  ...(currentCreative.value?.status === 'На проверке'
    ? auditedCreativesStore.auditedMedia
    : {}),
}))

const currentAuditedMedia = computed(() => {
  const index = Number(currentSlide.value)
  return auditedMedia.value?.[index]
})

function getImage(name) {
  return `/images/${name}`
}

function getVideo(name) {
  return `/videos/${name}`
}

function toggleFullscreen() {
  try {
    if (!fullScreenImage.value) {
      throw new Error('Элемент изображения не найден')
    }

    if (!document.fullscreenElement) {
      fullScreenImage.value.requestFullscreen()
      fullscreenStatus.value = true
    } else {
      document.exitFullscreen()
      fullscreenStatus.value = false
    }
  } catch (error) {
    console.error('Ошибка при переключении полноэкранного режима:', error)
  }
}

watchEffect(async () => {
  size.value = null
  
  try {
    const media = currentMedia.value
    if (!media?.mediaName) return

    const url = media?.type === 'video'
      ? `/videos/${media?.mediaName}`
      : `/images/${media?.mediaName}`
      
    const result = await (media?.type === 'video'
      ? getVideoSize(url)
      : getImageSize(url)
    )

    size.value = result
  } catch (error) {
    console.error('Ошибка при получении размера media:', error)
  }
})

function handleCheckboxChange(event) {
  errorStore.setError('')

  const titleOption = event.target.id
  if (event.target.checked) {
    auditedCreativesStore.updateAuditedMedia(
      Number(currentSlide.value),
      titleOption,
    )
  } else {
    auditedCreativesStore.removeAuditedMedia(
      Number(currentSlide.value),
      titleOption,
    )
  }
}

function handleAccept() {
  if (
    currentAuditedMedia.value.options.length === creativeOptions.value.length
  ) {
    auditedCreativesStore.updateAuditedStatusMedia(
      Number(currentSlide.value),
      'Принято',
    )
    auditedCreativesStore.updateUserCommentMedia(Number(currentSlide.value), '')
  } else {
    errorStore.setError('Не все обязательные поля выбраны')
  }
}

function handleReject() {
  errorStore.setError('')

  auditedCreativesStore.updateAuditedStatusMedia(
    Number(currentSlide.value),
    'Отклонено',
  )

  if (
    currentAuditedMedia.value.options.length === creativeOptions.value.length
  ) {
    auditedCreativesStore.updateActionStatusMedia(
      Number(currentSlide.value),
      'exception',
    )
    auditedCreativesStore.updateUserCommentMedia(Number(currentSlide.value), '')
  } else {
    auditedCreativesStore.updateActionStatusMedia(
      Number(currentSlide.value),
      'rejecting',
    )

    const filteredOptions = creativeOptions.value.filter(
      option => !currentAuditedMedia.value.options.includes(option.title),
    )

    auditedCreativesStore.updateUserCommentMedia(
      Number(currentSlide.value),
      formatOptions(filteredOptions),
    )
  }
}

function handleСhange() {
  auditedCreativesStore.updateAuditedStatusMedia(Number(currentSlide.value), '')
}

watchEffect(() => {
  const count = medias.value.length
  if (count > 0) {
    const mediaArray = Array.from({ length: count }, (_, index) => ({
      index,
      status: '',
      userActionStatus: '',
      comment: '',
      options: [],
    }))
    auditedCreativesStore.initializeAuditedMedia(mediaArray)
  }
})
</script>

<template>
  <div
    class="d-flex bg-white rounded-3 p-3"
    :class="{
      border_success_custom: currentAuditedMedia?.status === 'Принято',
      border_danger_custom: currentAuditedMedia?.status === 'Отклонено',
    }"
  >
    <div class="col-6 me-3 bg-light d-flex">
      <div
        class="d-flex flex-column justify-content-center align-items-center w-100"
      >
        <img
          ref="fullScreenImage"
          v-if="currentMedia && currentMedia?.type !== 'video'"
          :src="getImage(currentMedia?.mediaName)"
          class="img-fluid"
          :alt="currentMedia?.mediaName"
          v-fullscreen="fullscreenStatus"
        />
        <video
          ref="fullScreenImage"
          v-if="currentMedia && currentMedia?.type === 'video'"
          :src="getVideo(currentMedia?.mediaName)"
          class="video-fit"
          :alt="currentMedia?.mediaName"
          v-fullscreen="fullscreenStatus"
          controls
        ></video>
        <p class="mb-0 text-secondary p_custom">
          {{ currentMedia?.mediaName }}
        </p>
        <p class="mb-0 text-secondary">
          {{ size?.width }}х{{ size?.height }} •
          {{ formatDate(currentMedia?.dateUploaded, 'DD.MM.YYYY HH:mm') }}
        </p>
      </div>
      <div class="flex-shrink-1">
        <button class="btn p-0 border-0" @click="toggleFullscreen">
          <FullscreenIcon />
        </button>
      </div>
    </div>
    <div class="col-6">
      <div class="d-flex align-items-center mb-3">
        <h4 class="mb-0 me-2">Проверка креатива</h4>
        <CreativeStatus :status="currentAuditedMedia?.status" />
      </div>
      <div>
        <div
          class="form-check option_custom"
          v-for="option in creativeOptions"
          :key="option"
        >
          <input
            class="form-check-input me-1"
            type="checkbox"
            :value="option"
            :id="option.title"
            @change="handleCheckboxChange"
            :checked="currentAuditedMedia?.options?.includes(option.title)"
            :disabled="
              currentAuditedMedia?.status?.length > 0 ||
              currentCreative?.status === 'Отменено'
            "
          />
          <label class="form-check-label" for="firstCheckbox"
            >{{ option?.title }}<code> * </code>
            <QuestionCircleIcon
              data-bs-toggle="popover"
              data-bs-trigger="hover focus"
              data-bs-placement="top"
              data-bs-delay="500"
              data-bs-animation="true"
              :data-bs-content="option?.description"
              data-bs-custom-class="custom-popover"
          /></label>
        </div>
      </div>
      <div class="mt-4">
        <CommentInfo
          :media-info="true"
          :current-audited-media="currentAuditedMedia"
        />
      </div>
      <div
        v-if="
          currentAuditedMedia?.status?.length === 0 &&
          currentCreative?.status !== 'Отменено'
        "
        class="mt-4"
      >
        <ButtonOutline
          title="Принять"
          btn-outline="btn-outline-success"
          :handle="handleAccept"
        />
        <ButtonOutline
          title="Отклонить"
          btn-outline="btn-outline-danger"
          :handle="handleReject"
        />
      </div>
      <div
        v-if="
          currentAuditedMedia?.status?.length > 0 &&
          (currentAuditedMedia?.userActionStatus?.length === 0 ||
            currentAuditedMedia?.userActionStatus === 'saved')
        "
        class="mt-4"
      >
        <ButtonChange
          title="Изменить решение"
          width="170px"
          :handle="handleСhange"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../../assets/main.css';
input {
  cursor: pointer;
}
input:checked {
  background-color: var(--custom-color);
  border-color: var(--custom-color);
  color: white;
}
input:focus {
  box-shadow: var(--focus-box-shadow);
  border-color: var(--custom-color);
}
.option_custom {
  margin-bottom: 12px;
}
.p_custom {
  margin-top: 12px;
}
p {
  font-size: 12px !important;
}
.border_success_custom {
  border-left: 4px solid #198754;
}
.border_danger_custom {
  border-left: 4px solid #dc3545;
}
.video-fit {
  max-width: 100%;
  height: auto;
}
</style>
