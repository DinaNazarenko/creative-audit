<script setup>
import { CREATIVE_OPTIONS } from '@/lib/constants'
import QuestionCircleIcon from '@/components/icons/QuestionCircleIcon.vue'
import FullscreenIcon from '@/components/icons/FullscreenIcon.vue'
import { getImageSize } from '@/lib/utils/getImageSize'
import { formatDate } from '@/lib/utils/FormattingDates'
import { useMediaSlideStore } from '@/stores/mediaPagination'
import { ref, watchEffect, computed } from 'vue'

const props = defineProps({
  creative: Object,
})
const medias = ref(props.creative.media)
const creativeOptions = ref(CREATIVE_OPTIONS)
const size = ref(null)
const fullScreenImage = ref(null)
const fullscreenStatus = ref(false)

const mediaSlideStore = useMediaSlideStore()

const currentSlide = computed(() => mediaSlideStore.currentSlide)
const currentMedia = computed(() => {
  const index = Number(currentSlide.value)
  return medias.value?.[index]
})

function getImage(name) {
  return `/images/${name}`
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
  try {
    const media = currentMedia.value
    if (media && media.mediaName) {
      const result = await getImageSize(`/images/${media.mediaName}`)
      size.value = result
    } else {
      size.value = null
    }
  } catch (error) {
    console.error('Ошибка при получении размера media:', error)
    size.value = null
  }
})
</script>

<template>
  <div class="d-flex bg-white rounded-3 p-3 div_custom">
    <div class="col-6 me-3 bg-light d-flex">
      <div
        class="d-flex flex-column justify-content-center align-items-center w-100"
      >
        <img
          ref="fullScreenImage"
          v-if="currentMedia"
          :src="getImage(currentMedia.mediaName)"
          class="img-fluid"
          :alt="currentMedia.mediaName"
          v-fullscreen="fullscreenStatus"
        />
        <p class="mb-0 text-secondary p_custom">
          {{ currentMedia.mediaName }}
        </p>
        <p class="mb-0 text-secondary">
          {{ size?.width }}х{{ size?.height }} •
          {{ formatDate(currentMedia.dateUploaded, 'DD.MM.YYYY HH:mm') }}
        </p>
      </div>
      <div class="flex-shrink-1">
        <button class="btn p-0 border-0" @click="toggleFullscreen">
          <FullscreenIcon />
        </button>
      </div>
    </div>
    <div class="col-6">
      <h4 class="mb-3">Проверка креатива</h4>
      <div class="mb-4">
        <div
          v-for="item in creativeOptions"
          :key="item"
          class="form-check option_custom"
        >
          <input
            class="form-check-input me-1"
            type="checkbox"
            :value="item"
            :id="item"
          />
          <label class="form-check-label" for="firstCheckbox"
            >{{ item }}<code> *</code> <QuestionCircleIcon
          /></label>
        </div>
      </div>
      <div>
        <button class="btn me-3 btn-outline-success btn_custom">Принять</button>
        <button class="btn btn-outline-danger btn_custom">Отклонить</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../../assets/main.css';
.div_custom {
  height: 487px;
}
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
.btn_custom {
  width: 109px;
  height: 38px;
}
.p_custom {
  margin-top: 12px;
}
p {
  font-size: 12px !important;
}
</style>
