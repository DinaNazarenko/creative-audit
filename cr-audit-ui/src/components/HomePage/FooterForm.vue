<script setup>
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon.vue'
import ChevronRightIcon from '@/components/icons/ChevronRightIcon.vue'
import { useCreativesStore } from '@/stores/creatives'
import { useCreativesPageStore } from '@/stores/pagination'
import { PAGE_STRINGS } from '@/lib/constants'
import { computed } from 'vue'

defineProps({
  isLoading: Boolean,
})

const creativesStore = useCreativesStore()
const creativesPageStore = useCreativesPageStore()

const sortedCreatives = computed(() => [
  ...creativesStore.sortedCreatives,
])
const creativesPage = computed(() => ({
  creativesPerPage: creativesPageStore.creativesPerPage,
  currentPage: creativesPageStore.currentPage,
  amountCreatives: creativesPageStore.amountCreatives,
}))

const pages = computed(() => {
  const perPage = creativesPage.value.creativesPerPage
  if (typeof perPage === 'string') {
    return 1
  } else {
    return Math.ceil(sortedCreatives.value.length / perPage)
  }
})

function selectItem(item) {
  creativesPageStore.updateCreativesPerPage(item)
  creativesPageStore.updateCurrentPage(1)
}

function selectCurrentPage(page) {
  creativesPageStore.updateCurrentPage(page)
}

const prevPage = () => {
  if (creativesPage.value.currentPage > 1) {
    const currentPage = creativesPage.value.currentPage
    creativesPageStore.updateCurrentPage(currentPage - 1)
  }
}

const nextPage = () => {
  if (creativesPage.value.currentPage < pages.value) {
    const currentPage = creativesPage.value.currentPage
    creativesPageStore.updateCurrentPage(currentPage + 1)
  }
}
</script>
<template>
  <footer
    class="d-flex justify-content-between text-center bg-white footer_custom"
  >
    <div class="d-flex justify-content-center align-items-center">
      <p v-if="isLoading" class="placeholder-wave">
        <a
          class="btn disabled placeholder col-12 a_skeleton"
          aria-disabled="true"
        ></a>
      </p>
      <div v-if="!isLoading" class="text-gray-600 div_custom">
        Строк на странице
      </div>
      <div v-if="!isLoading" class="dropdown">
        <button
          class="btn btn-light dropdown-toggle rounded-1 text-start form-select mb-1 py-1 px-2 button_custom"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ creativesPage.creativesPerPage }}
        </button>
        <ul
          class="dropdown-menu p-0 ul_custom"
        >
          <li
            v-for="item in PAGE_STRINGS"
            :key="item"
            class="dropdown-item py-1 px-2"
            @click="selectItem(item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
    <div class="d-flex justify-content-center align-items-center">
      <p v-if="isLoading" class="placeholder-wave">
        <a
          class="btn disabled placeholder col-12 a_skeleton skeleton_second"
          aria-disabled="true"
        ></a>
      </p>
      <div v-if="!isLoading" class="div_custom">
        Показано 1-{{ creativesPage.amountCreatives }} из
        {{ sortedCreatives.length }}
      </div>
      <nav v-if="!isLoading" aria-label="Page navigation example">
        <ul class="pagination justify-content-end m-0">
          <li class="page-item">
            <a class="page-link py-1 px-2 a_left" @click="prevPage">
              <ChevronLeftIcon />
            </a>
          </li>
          <li
            v-for="page in pages"
            :key="page"
            class="page-item"
            @click="selectCurrentPage(page)"
          >
            <a
              class="page-link py-1 px-2"
              :class="{ active: creativesPage.currentPage === page }"
              href="#"
              >{{ page }}</a
            >
          </li>
          <li class="page-item">
            <a class="page-link py-1 px-2 a_right" @click="nextPage">
              <ChevronRightIcon />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>
<style scoped>
@import '../../assets/main.css';
.dropdown-menu {
  transform: translateY(-150%);
}
.a_skeleton {
  width: 197px;
  height: 31px;
  border-radius: 10px;
  background-color: #e9ecef;
  border: none;
}
.skeleton_second{
  width: 215px;
}
p {
  margin-top: 12px;
  margin-bottom: 13px;
}
.footer_custom {
  height: 56px !important;
  padding-top: 12px;
  padding-left: 32px;
  padding-bottom: 13px;
  padding-right: 32px;
}
.button_custom {
  width: 60px;
  height: 31px;
  font-size: 14px;
  line-height: 21px;
  padding-right: 12px !important;
  border-radius: 3.2px !important;
  background-color: #ffffff;
  border-color: #ced4da;
  cursor: pointer !important;
  color: #212529 !important;
}
.button_custom::after {
  content: none;
}
.ul_custom {
  min-width: 60px;
  border-radius: 3.2px;
}
li {
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  cursor: pointer !important;
}
a {
  height: 31px !important;
  width: 30px;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.active,
li:active,
li:focus,
a:active,
a:focus {
  background-color: var(--custom-color);
  border-color: var(--custom-color);
  color: white;
}
.div_custom {
  margin-right: 12px;
  color: #6c757d;
  font-size: 14px;
  line-height: 21px;
}
.a_left {
  border-top-left-radius: 3.2px !important;
  border-bottom-left-radius: 3.2px !important;
}
.a_right {
  border-top-right-radius: 3.2px !important;
  border-bottom-right-radius: 3.2px !important;
}
:focus {
  box-shadow: var(--focus-box-shadow) !important;
  border-color: var(--custom-color) !important;
}
</style>
