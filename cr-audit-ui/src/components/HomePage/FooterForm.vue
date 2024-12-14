<script setup>
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon.vue'
import ChevronRightIcon from '@/components/icons/ChevronRightIcon.vue'
import { useSortedCreativesStore } from '@/stores/sortedCreatives'
import { useCreativesPageStore } from '@/stores/pagination'
import { PAGE_STRINGS } from '@/lib/constants'
import { ref, computed } from 'vue'

const sortedCreativesStore = useSortedCreativesStore()
const creativesPageStore = useCreativesPageStore()

const sortedCreatives = computed(() => [
  ...sortedCreativesStore.sortedCreatives,
])
const creativesPage = computed(() => ({
  creativesPerPage: creativesPageStore.creativesPerPage,
  currentPage: creativesPageStore.currentPage,
}))

const isDropdownOpen = ref(false)

const pages = computed(() => {
  const perPage = creativesPage.value.creativesPerPage
  if (typeof perPage === 'string') {
    return 1
  } else {
    return Math.ceil(sortedCreatives.value.length / perPage)
  }
})

const handleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}
function selectItem(item) {
  creativesPageStore.updateCreativesPerPage(item)
  isDropdownOpen.value = false
}

function selectCurrentPage(page) {
  creativesPageStore.updateCurrentPage(page)
}
</script>
<template>
  <footer
    class="d-flex justify-content-between text-center bg-white footer_custom"
  >
    <div class="d-flex justify-content-center align-items-center">
      <div class="text-gray-600 div_custom">Строк на странице</div>
      <div class="dropdown">
        <button
          class="btn btn-light dropdown-toggle rounded-1 text-start form-select mb-1 py-1 px-2 button_custom"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          @click="handleDropdown"
        >
          {{ creativesPage.creativesPerPage }}
        </button>
        <ul
          v-if="isDropdownOpen"
          class="dropdown-menu list-group p-0 ul_custom"
        >
          <li
            v-for="item in PAGE_STRINGS"
            :key="item"
            class="dropdown-item list-group-item py-1 px-2"
            @click="selectItem(item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
    <div class="d-flex justify-content-center align-items-center">
      <div class="div_custom">Показано 1-4 из {{ sortedCreatives.length }}</div>
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-end m-0">
          <li class="page-item">
            <a class="page-link py-1 px-2 a_left">
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
              :class="{'active': creativesPage.currentPage === page }"
              href="#"
              >{{ page }}</a
            >
          </li>
          <li class="page-item">
            <a class="page-link py-1 px-2 a_right" href="#">
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
  border: none;
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
