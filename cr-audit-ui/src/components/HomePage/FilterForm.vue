<script setup>
import SearchIcon from '@/components/icons/SearchIcon.vue'
import { useTableFiltersStore } from '@/stores/tableFilters'
import { ref, computed, reactive, watch } from 'vue'

const props = defineProps({
  statuses: Array,
  types: Array,
  accounts: Array,
  advertisers: Array,
})

const state = reactive({
  isStatusesOpen: false,
  isTypesOpen: false,
  isAccountsOpen: false,
  isAdvertisersOpen: false,
})

const tableFiltersStore = useTableFiltersStore()
const filters = computed(() => tableFiltersStore)

const searchItem = ref('')

const filteredAccounts = computed(() => filterAccounts(searchItem.value))
const filteredAdvertisers = computed(() => filterAdvertisers(searchItem.value))

const toggleState = stateKey => {
  state[stateKey] = !state[stateKey]
  if (stateKey === 'isAccountsOpen' || stateKey === 'isAdvertisersOpen') {
    searchItem.value = ''
  }
}

const filterAccounts = value => {
  return props.accounts.filter(account =>
    account.toLowerCase().includes(value.toLowerCase()),
  )
}

const filterAdvertisers = value => {
  return props.advertisers.filter(advertiser =>
    advertiser.toLowerCase().includes(value.toLowerCase()),
  )
}

const onChangeSearch = event => {
  searchItem.value = event.target.value.trim()
}

function handleCheckboxChange(event, filterKey) {
  const key = event.target.id
  if (event.target.checked) {
    tableFiltersStore.updateTableFilters(filterKey, key)
  } else {
    tableFiltersStore.removeTableFilters(filterKey, key)
  }
}

// Если переходим по навигации На проверке/Проверено/Все -> необходимо обновлять выбранные фильтры
function updateFilters(filterKey) {
  if (!props[filterKey]) return

  filters.value[filterKey].forEach(key => {
    if (!props[filterKey].includes(key)) {
      tableFiltersStore.removeTableFilters(filterKey, key)
    }
  })
}

watch(
  () => props.accounts,
  () => updateFilters('accounts'),
)
watch(
  () => props.advertisers,
  () => updateFilters('advertisers'),
)
</script>
<template>
  <div class="d-flex">
    <div class="dropdown dropdown_custom">
      <button
        class="btn btn-light dropdown-toggle rounded-1 text-secondary text-start form-select mb-1 button_custom"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        @click="toggleState('isStatusesOpen')"
      >
        <template v-if="filters.statuses.size > 0">
          Статус{{
            filters.statuses.size === props.statuses.length
              ? ': Все'
              : `: ${filters.statuses.size}`
          }}
        </template>
        <template v-if="filters.statuses.size === 0"> Статус </template>
      </button>
      <ul
        v-if="state.isStatusesOpen"
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
            :value="item"
            :id="item"
            @change="handleCheckboxChange($event, 'statuses')"
            :checked="filters.statuses.has(item)"
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
        @click="toggleState('isTypesOpen')"
      >
        <template v-if="filters.types.size > 0">
          Тип{{
            filters.types.size === props.types.length
              ? ': Все'
              : `: ${filters.types.size}`
          }}
        </template>
        <template v-if="filters.types.size === 0"> Тип </template>
      </button>
      <ul
        v-if="state.isTypesOpen"
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
            :value="item"
            :id="item"
            @change="handleCheckboxChange($event, 'types')"
            :checked="filters.types.has(item)"
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
        @click="toggleState('isAccountsOpen')"
      >
        <template v-if="filters.accounts.size > 0">
          Кабинет{{
            filters.accounts.size === props.accounts.length
              ? ': Все'
              : `: ${filters.accounts.size}`
          }}
        </template>
        <template v-if="filters.accounts.size === 0"> Кабинет </template>
      </button>
      <ul
        v-if="state.isAccountsOpen"
        class="dropdown-menu list-group rounded-1 overflow-hidden py-0 ul_custom"
      >
        <div class="border-bottom">
          <form class="position-relative my-2 px-3" role="search">
            <input
              class="form-control me-2 search_custom"
              placeholder="Поиск"
              aria-label="Search"
              @input="onChangeSearch"
            />
            <span class="position-absolute top-50 end-0 me-3 translate-middle">
              <SearchIcon />
            </span>
          </form>
        </div>
        <div class="overflow-auto scroll_custom">
          <li
            v-for="item in filteredAccounts"
            :key="item"
            class="dropdown-item list-group-item"
          >
            <input
              class="form-check-input me-1"
              type="checkbox"
              :value="item"
              :id="item"
              @change="handleCheckboxChange($event, 'accounts')"
              :checked="filters.accounts.has(item)"
            />
            <label class="form-check-label" for="firstCheckbox">
              <span class="d-inline-block text-truncate span_custom">
                {{ item }}
              </span></label
            >
          </li>
        </div>
      </ul>
    </div>
    <div class="dropdown drdn_custom">
      <button
        class="btn btn-light dropdown-toggle rounded-1 text-secondary text-start form-select mb-1 btn_custom"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        @click="toggleState('isAdvertisersOpen')"
      >
        <template v-if="filters.advertisers.size > 0">
          Рекламодатель{{
            filters.advertisers.size === props.advertisers.length
              ? ': Все'
              : `: ${filters.advertisers.size}`
          }}
        </template>
        <template v-if="filters.advertisers.size === 0">
          Рекламодатель
        </template>
      </button>
      <ul
        v-if="state.isAdvertisersOpen"
        class="dropdown-menu list-group rounded-1 overflow-hidden py-0 ul_custom"
      >
        <div class="border-bottom">
          <form class="position-relative my-2 px-3" role="search">
            <input
              class="form-control me-2 search_custom"
              placeholder="Поиск"
              aria-label="Search"
              @input="onChangeSearch"
            />
            <span class="position-absolute top-50 end-0 me-3 translate-middle">
              <SearchIcon />
            </span>
          </form>
        </div>
        <div class="overflow-auto scroll_custom">
          <li
            v-for="item in filteredAdvertisers"
            :key="item"
            class="dropdown-item list-group-item"
          >
            <input
              class="form-check-input me-1"
              type="checkbox"
              :value="item"
              :id="item"
              @change="handleCheckboxChange($event, 'advertisers')"
              :checked="filters.advertisers.has(item)"
            />
            <label class="form-check-label" for="firstCheckbox">
              <span class="d-inline-block text-truncate span_custom">
                {{ item }}
              </span></label
            >
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
.drdn_custom {
  margin-right: 12px;
  width: 196px;
}
.button_custom {
  width: 147px;
}
.btn_custom {
  width: 196px;
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
.ul_custom {
  width: 220px;
  height: 218px;
}
.btn_custom::after,
.button_custom::after {
  content: none;
}
li {
  border: none;
  height: 40px;
}
.scroll_custom {
  scrollbar-width: thin;
}
.span_custom {
  max-width: 155px;
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
