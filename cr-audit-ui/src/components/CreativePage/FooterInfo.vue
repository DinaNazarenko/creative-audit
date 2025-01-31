<script setup>
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon.vue'
import ChevronRightIcon from '@/components/icons/ChevronRightIcon.vue'
// import { useCreativesPageStore } from '@/stores/pagination'
import { ref } from 'vue'

const props = defineProps({
  creative: Object,
})
const medias = ref(props.creative.media)

// const creativesPageStore = useCreativesPageStore()

// const creativesPage = computed(() => ({
//   creativesPerPage: creativesPageStore.creativesPerPage,
//   currentPage: creativesPageStore.currentPage,
//   amountCreatives: creativesPageStore.amountCreatives,
// }))

// const pages = computed(() => {
//   const perPage = creativesPage.value.creativesPerPage
//   if (typeof perPage === 'string') {
//     return 1
//   } else {
//     return Math.ceil(sortedCreatives.value.length / perPage)
//   }
// })

// function selectCurrentPage(page) {
//   creativesPageStore.updateCurrentPage(page)
// }

// const prevPage = () => {
//   if (creativesPage.value.currentPage > 1) {
//     const currentPage = creativesPage.value.currentPage
//     creativesPageStore.updateCurrentPage(currentPage - 1)
//   }
// }

// const nextPage = () => {
//   if (creativesPage.value.currentPage < pages.value) {
//     const currentPage = creativesPage.value.currentPage
//     creativesPageStore.updateCurrentPage(currentPage + 1)
//   }
// }
</script>
<template>
  <footer
    class="d-flex justify-content-between align-items-center bg-white footer_custom"
  >
    <div class="div_custom">
      Креатив 1 из
      {{ medias.length }}
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
        class="btn btn-light rounded-3 p-0 col-1 btn_carousel"
      ></button>
      <button class="col-1 btn_link" @click="nextPage">
        <ChevronRightIcon :width="20" :height="20" />
      </button>
    </div>
    <div>
      <button type="button" class="btn btn-primary rounded-1 btn_send">
        Отправить
      </button>
    </div>
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
.btn_link:hover {
  transform: scale(1.05);
}
.btn_send:active,
.btn_link:active {
  transform: scale(0.95);
}
.btn_carousel {
  width: 52px;
  height: 8px;
  background-color: #dee2e6;
}
.btn_carousel:hover {
  border: 1px solid #dee2e6;
}
.btn_carousel:active {
  width: 78px;
  height: 12px;
  background-color: #dee2e6;
}
.pagination_custom {
  column-gap: 12px;
}
.btn_send {
  width: 106px;
  height: 38px;
  padding-bottom: 6px;
  padding-top: 6px;
  padding-left: 12px;
  padding-right: 12px;
  background-color: var(--custom-color);
  border: 1px solid var(--custom-color);
}
.btn_send:hover,
.btn_send:active {
  background-color: #ffffff;
  color: var(--custom-color);
}
</style>
