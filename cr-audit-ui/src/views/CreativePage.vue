<script setup>
import SideBar from '@/components/HomePage/SideBar.vue'
import HeaderInfo from '@/components/CreativePage/HeaderInfo.vue'
import LinkInfo from '@/components/CreativePage/LinkInfo.vue'
import CreativeInfo from '@/components/CreativePage/CreativeInfo.vue'
import FooterInfo from '@/components/CreativePage/FooterInfo.vue'
import AlertDanger from '@/components/AlertDanger.vue'
import AlertSuccess from '@/components/AlertSuccess.vue'
import StaticBackdropModal from '@/components/common/StaticBackdropModal.vue'
import { calculateTimeBetweenDates } from '@/lib/utils/FormattingDates'
import { useModalStore } from '@/stores/modal'
import { useRouter } from 'vue-router'
import { usePopover } from '@/lib/utils/popover'
import { onMounted, ref, watch, nextTick } from 'vue'
import axios from 'axios'

const isLoading = ref(true)

const creative = ref([])
const router = useRouter()

const modalStore = useModalStore()

const getCreative = async () => {
  try {
    const url = `https://596b6b27365a5903.mokky.dev/creatives/3`

    const { data } = await axios.get(url)

    creative.value = data

    creative.value.timeBeforeStart = calculateTimeBetweenDates(
      new Date(),
      creative.value.dateStart,
      'DD',
    )

    isLoading.value = false
  } catch (error) {
    console.error('Ошибка получения креатива:', error.message)
    isLoading.value = false
  }
}

function handleCheck() {
  if (creative.value.status === 'На проверке') {
    modalStore.updateModalStatus('exit')
  } else {  router.push({ name: 'home' })}
}

onMounted(async () => {
  await getCreative()
})

watch(getCreative)
const { updatePopovers } = usePopover()
nextTick(updatePopovers)

watch(
  creative,
  () => {
    updatePopovers()
  },
  { deep: true },
)
</script>
<template>
  <div v-auto-animate class="d-flex">
    <SideBar :creative="creative" />
    <div class="d-flex flex-column">
      <div class="container_custom">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li
              class="breadcrumb-item text_custom"
              role="button"
              :data-bs-toggle="
                creative.status === 'На проверке' ? 'modal' : undefined
              "
              :data-bs-target="
                creative.status === 'На проверке'
                  ? '#staticBackdrop'
                  : undefined
              "
              @click="handleCheck"
            >
              Креативы
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ creative.name }}
            </li>
            <StaticBackdropModal />
          </ol>
        </nav>
        <h2 class="mb-3">{{ creative.name }}</h2>
        <HeaderInfo :creative="creative" />
        <hr />
        <div
          class="d-flex flex-column overflow-y-auto body_custom v-auto-animate"
        >
          <LinkInfo :creative="creative" />
          <CreativeInfo :creative="creative" />
          <div class="alert_custom">
            <AlertSuccess />
            <AlertDanger />
          </div>
        </div>
      </div>
      <FooterInfo :creative="creative" />
    </div>
  </div>
</template>

<style scoped>
@import '../assets/main.css';
.container_custom {
  padding-top: 32px;
  padding-right: 32px;
  padding-left: 32px;
  background-color: #f8f9fa;
}
hr {
  margin-top: 20px;
  margin-bottom: 20px;
}
.body_custom {
  min-height: calc(100vh - 273px);
  max-height: calc(100vh - 273px);
  max-width: 95vw;
  min-width: 95vw;
  position: relative;
  gap: 20px;
  scrollbar-width: thin;
}
.alert_custom {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1030;
}
.text_custom {
  color: var(--custom-color);
}
</style>
