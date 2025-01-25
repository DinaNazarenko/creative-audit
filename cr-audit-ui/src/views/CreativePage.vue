<script setup>
import SideBar from '@/components/HomePage/SideBar.vue'
import HeaderInfo from '@/components/CreativePage/HeaderInfo.vue'
import FooterForm from '@/components/HomePage/FooterForm.vue'
import { calculateTimeBetweenDates } from '@/lib/utils/FormattingDates'
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'

const pendingCreativesCount = ref(0)
const isLoading = ref(true)

const creative = ref([])

const getCreative = async () => {
  try {
    const url = `https://596b6b27365a5903.mokky.dev/creatives/7`

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

onMounted(async () => {
  await getCreative()
})

watch(getCreative, pendingCreativesCount)
</script>
<template>
  <div v-auto-animate class="d-flex">
    <SideBar :count="pendingCreativesCount" />
    <div class="d-flex flex-column">
      <div class="container_custom">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link :to="{ name: 'home' }" class="text-decoration-none">
                Креативы
              </router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ creative.name }}
            </li>
          </ol>
        </nav>
        <h2 class="mb-3">{{ creative.name }}</h2>
        <HeaderInfo :creative="creative" />
        <hr />
      </div>
      <FooterForm :isLoading="isLoading" />
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
</style>
