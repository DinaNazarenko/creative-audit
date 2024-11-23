<script setup>
import SearchIcon from '@/components/icons/SearchIcon.vue'
import { ref } from 'vue'
defineProps({
  statuses: Array,
  types: Array,
  accounts: Array,
})
const isStatusesOpen = ref(false)
const isTypesOpen = ref(false)
const isAccountsOpen = ref(false)

const toggleStatuses = () => {
  isStatusesOpen.value = !isStatusesOpen.value
}
const toggleTypes = () => {
  isTypesOpen.value = !isTypesOpen.value
}
const toggleAccounts = () => {
  isAccountsOpen.value = !isAccountsOpen.value
}
</script>
<template>
  <div class="d-flex">
    <div class="dropdown dropdown_custom">
      <button
        class="btn btn-light dropdown-toggle rounded-1 text-secondary text-start form-select mb-1 button_custom"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        @click="toggleStatuses"
      >
        Статус
      </button>
      <ul
        v-if="isStatusesOpen"
        class="dropdown-menu list-group rounded-1 ul_statuses"
      >
        <li
          v-for="item in statuses"
          :key="item"
          class="dropdown-item list-group-item"
        >
          <input
            class="form-check-input me-1"
            type="checkbox"
            value=""
            id="item"
          />
          <label class="form-check-label" for="firstCheckbox">{{ item }}</label>
        </li>
      </ul>
    </div>
    <div class="dropdown dropdown_custom">
      <button
        class="btn btn-light dropdown-toggle rounded-1 text-secondary text-start form-select mb-1 button_custom"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        @click="toggleTypes"
      >
        Тип
      </button>
      <ul
        v-if="isTypesOpen"
        class="dropdown-menu list-group rounded-1 ul_types"
      >
        <li
          v-for="item in types"
          :key="item"
          class="dropdown-item list-group-item"
        >
          <input
            class="form-check-input me-1"
            type="checkbox"
            value=""
            id="item"
          />
          <label class="form-check-label" for="firstCheckbox">{{ item }}</label>
        </li>
      </ul>
    </div>
    <div class="dropdown dropdown_custom">
      <button
        class="btn btn-light dropdown-toggle rounded-1 text-secondary text-start form-select mb-1 button_custom"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        @click="toggleAccounts"
      >
        Кабинет
      </button>
      <ul
        v-if="isAccountsOpen"
        class="dropdown-menu list-group rounded-1 overflow-hidden py-0 ul_accounts"
      >
        <div class="border-bottom">
          <form class="position-relative my-2 px-3" role="search">
            <input
              class="form-control me-2 search_custom"
              placeholder="Поиск"
              aria-label="Search"
            />
            <span
              class="position-absolute top-50 end-0 me-3 translate-middle"
            >
              <SearchIcon />
            </span>
          </form>
        </div>
        <div class="overflow-auto scroll_custom">
          <li
            v-for="item in accounts"
            :key="item"
            class="dropdown-item list-group-item"
          >
            <input
              class="form-check-input me-1"
              type="checkbox"
              value=""
              id="item"
            />
            <label class="form-check-label" for="firstCheckbox">{{
              item
            }}</label>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>
<style scoped>
@import '../../assets/main.css';
.dropdown_custom {
  margin-right: 12px;
  width: 147px;
}
.button_custom {
  width: 147px;
}
input {
  cursor: pointer;
}
.search_custom {
  width: 188px;
  height: 38px;
}
input:checked {
  background-color: var(--custom-color);
  border-color: var(--custom-color);
  color: white;
}
button {
  background-color: #ffffff;
  border: 1px solid #ced4da;
}
.ul_statuses {
  width: 242px;
  height: 176px;
}
.ul_types {
  width: 169px;
  height: 176px;
}
.ul_accounts {
  width: 220px;
  height: 218px;
}
.button_custom::after {
  content: none;
}
li {
  border: none;
  overflow-y: auto;
}
.scroll_custom {
  scrollbar-width: thin;
}
li:active {
  background-color: initial !important;
  color: initial !important;
  border-color: initial !important;
}
button:hover {
  background-color: initial !important;
}
:focus {
  box-shadow: var(--focus-box-shadow);
  border-color: var(--custom-color);
}
</style>
