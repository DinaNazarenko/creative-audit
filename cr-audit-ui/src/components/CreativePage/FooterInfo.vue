<script setup>
import { useAuditedCreativesStore } from '@/stores/auditedCreatives'
import StaticBackdropModal from '@/components/common/StaticBackdropModal.vue'
import ButtonChange from '@/components/common/ButtonChange.vue'
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon.vue'
import ChevronRightIcon from '@/components/icons/ChevronRightIcon.vue'
import { useMediaSlideStore } from '@/stores/mediaPagination'
import { useModalStore } from '@/stores/modal'
import { ref, computed, watchEffect } from 'vue'

const props = defineProps({
  creative: {
    type: Object,
    default: () => ({
      media: [],
    }),
  },
})

const currentCreative = ref({})
const medias = ref([])

const modalStore = useModalStore()
const auditedCreativesStore = useAuditedCreativesStore()
const mediaSlideStore = useMediaSlideStore()

const auditedMedia = computed(() => auditedCreativesStore.auditedMedia)
const auditedLink = computed(() => auditedCreativesStore.auditedLink)
const currentSlide = computed(() => mediaSlideStore.currentSlide)

function handleCheck() {
  // Всё проверено
  if (
    auditedLink.value.status.length > 0 &&
    auditedMedia.value.every(item => item.status.length > 0)
  ) {
    modalStore.updateModalStatus('verified')
  }
  // Креатив не проверен
  if (auditedMedia.value.some(item => item.status.length === 0)) {
    modalStore.updateModalStatus('unverifiedCreative')
  }
  // Ссылка не проверена
  if (auditedLink.value.status.length === 0) {
    modalStore.updateModalStatus('unverifiedLink')
  }
}

watchEffect(() => {
  currentCreative.value = props.creative

  if (props.creative.status === 'На проверке') {
    medias.value = auditedMedia.value
  } else {
    medias.value = props.creative?.media || []
  }
})

function selectSlide(slideNumber) {
  mediaSlideStore.updateCurrentSlide(slideNumber)
}

const prevPage = () => {
  if (currentSlide.value > 0) {
    mediaSlideStore.updateCurrentSlide(currentSlide.value - 1)
  }
}

const nextPage = () => {
  if (currentSlide.value < medias.value.length - 1) {
    mediaSlideStore.updateCurrentSlide(currentSlide.value + 1)
  }
}
</script>
<template>
  <footer
    class="d-flex justify-content-between align-items-center bg-white footer_custom"
  >
    <div class="div_custom">
      Креатив {{ currentSlide + 1 }} из
      {{ medias?.length }}
    </div>
    <div
      class="grid pagination m-0 d-flex align-items-center pagination_custom"
    >
      <button class="col-1 btn_link" @click="prevPage">
        <ChevronLeftIcon :width="20" :height="20" />
      </button>
      <button
        v-for="media in medias"
        :key="media"
        type="button"
        :class="{
          btn: true,
          'btn-light': true,
          'rounded-3': true,
          'p-0': true,
          'col-1': true,
          btn_carousel: true,
          success_status: media.status === 'Принято',
          danger_status: media.status === 'Отклонено',
          active: currentSlide === medias.indexOf(media),
        }"
        @click="selectSlide(medias.indexOf(media))"
      ></button>
      <button class="col-1 btn_link" @click="nextPage">
        <ChevronRightIcon :width="20" :height="20" />
      </button>
    </div>
    <div>
      <ButtonChange
        v-if="currentCreative?.status === 'На проверке'"
        title="Отправить"
        :should-have-modal="true"
        @click="handleCheck"
      />
    </div>
    <StaticBackdropModal />
  </footer>
</template>
<style scoped>
@import '../../assets/main.css';
.footer_custom {
  height: 56px !important;
  padding-top: 12px;
  padding-left: 32px;
  padding-bottom: 13px;
  padding-right: 32px;
}
.div_custom {
  margin-right: 12px;
  color: #6c757d;
  font-size: 14px;
  line-height: 21px;
}
.btn_link {
  width: 38px;
  height: 38px;
  border: none;
  background-color: #ffffff00;
  padding-bottom: 6px;
  padding-top: 6px;
  padding-left: 12px;
  padding-right: 12px;
  color: var(--custom-color);
}
.btn_carousel {
  width: 52px;
  height: 8px;
  background-color: #dee2e6;
  border: none;
}
.pagination_custom {
  column-gap: 12px;
}
.success_status {
  background-color: #198754;
}
.danger_status {
  background-color: #dc3545;
}
.btn_carousel:hover,
.btn_link:hover {
  transform: scale(1.05);
}
.btn_carousel:active,
.btn_link:active {
  transform: scale(0.95);
}
.active {
  width: 78px;
  height: 12px;
}
</style>
