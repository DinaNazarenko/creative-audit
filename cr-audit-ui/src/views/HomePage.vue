<script setup>
import TableForm from '@/components/HomePage/TableForm.vue'
import SideBar from '@/components/HomePage/SideBar.vue'
import DownloadIcon from '@/components/icons/DownloadIcon.vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import FooterForm from '@/components/HomePage/FooterForm.vue'
import FilterForm from '@/components/HomePage/FilterForm.vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import { STATUS_SELECT, TYPE_SELECT } from '@/lib/constants'
import { calculateTimeBetweenDates } from '@/lib/utils/FormattingDates'
import { useTableFiltersStore } from '@/stores/tableFilters'
import { onMounted, ref, reactive, watch } from 'vue'
import debounce from 'lodash.debounce'
import axios from 'axios'
import '@vuepic/vue-datepicker/dist/main.css'
import { ru } from 'date-fns/locale'

const creatives = ref([])
const accounts = ref([])
const advertisers = ref([])
const types = ref(TYPE_SELECT)
const statuses = ref(STATUS_SELECT)
const pendingCreativesCount = ref(0)
const isExport = ref(false)

const tableFiltersStore = useTableFiltersStore()

const filters = reactive({
  sortBy: 'idApplication',
  status: 'На проверке',
  searchQuery: '',
  urlStatusParam: '',
})
const date = ref(new Date())

const formatedDate = date => {
  const startDateObject = date[0] ? new Date(date[0]) : new Date()
  const startFormattedDate = startDateObject.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  const endDateObject = date[1]
    ? new Date(date[1])
    : new Date(new Date().setDate(startDateObject.getDate() + 7))
  const endFormattedDate = endDateObject.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  return `${startFormattedDate} - ${endFormattedDate}`
}

const handleStatusSelection = event => {
  const tempStatus = event.currentTarget.textContent
    .replace(/[0-9]/g, '')
    .trim()

  if (tempStatus === 'На проверке') {
    filters.status = 'На проверке'
    filters.urlStatusParam = ''
  } else if (tempStatus === 'Проверено') {
    filters.status = ''
    filters.urlStatusParam = `?status[]=Согласовано&status[]=Отклонено&status[]=Частично согласовано`
  } else {
    filters.status = ''
    filters.urlStatusParam = ''
  }
}

const onChangeSearch = debounce(event => {
  filters.searchQuery = event.target.value
}, 500)

const getCreatives = async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
      status: filters.status || undefined,
    }

    if (filters.searchQuery) {
      params.nameAdGroup = `*${filters.searchQuery}*`
    }
    const url =
      filters.urlStatusParam.length > 0
        ? `https://596b6b27365a5903.mokky.dev/creatives${filters.urlStatusParam}`
        : 'https://596b6b27365a5903.mokky.dev/creatives'

    const { data } = await axios.get(url, {
      params,
    })
    if (filters.status === 'На проверке') {
      pendingCreativesCount.value = data.length
    }

    creatives.value = data

    creatives.value = creatives.value.map(item => ({
      ...item,
      timeBeforeStart: calculateTimeBetweenDates(
        new Date(),
        item.dateStart,
        'DD',
      ),
      timeToConfirm: calculateTimeBetweenDates(
        item.dateCreat,
        item.dateAudit,
        'DD HH',
      ),
    }))

    accounts.value = Array.from(new Set(data.map(item => item.account)))
    advertisers.value = Array.from(new Set(data.map(item => item.advertiser)))
  } catch (error) {
    console.error('Ошибка получения креативов:', error.message)
  }
}

onMounted(async () => {
  await getCreatives()

  const newStartDate = new Date()
  const newEndDate = new Date(new Date().setDate(newStartDate.getDate() + 7))

  date.value = [newStartDate, newEndDate]
})

watch(filters, getCreatives, pendingCreativesCount)

const handleDate = modelData => {
  date.value = modelData
  tableFiltersStore.updateDateRange('dateRange', date.value)
}

const handleExport = () => {
  isExport.value = true
  setTimeout(() => {
    isExport.value = false
  }, 3000)
}
</script>
<template>
  <div v-auto-animate class="d-flex">
    <SideBar :count="pendingCreativesCount" />
    <div class="d-flex flex-column">
      <div class="container_custom">
        <h2 class="m-0">Креативы</h2>
        <ul class="nav nav-underline nav_custom">
          <li class="nav-item nav_item_custom">
            <a
              @click="handleStatusSelection"
              class="text-decoration-none nav-link px-3 py-2 a_custom"
              href="#"
              >На проверке
              <span class="badge text-bg-danger rounded-pill">{{
                pendingCreativesCount
              }}</span>
            </a>
          </li>
          <li class="nav-item nav_item_custom">
            <a
              @click="handleStatusSelection"
              class="text-decoration-none nav-link px-3 py-2 a_custom"
              href="#"
              >Проверено</a
            >
          </li>
          <li class="nav-item nav_item_custom">
            <a
              @click="handleStatusSelection"
              class="text-decoration-none nav-link px-3 py-2 a_custom"
              href="#"
              >Все</a
            >
          </li>
        </ul>
        <div class="d-flex justify-content-between mb-4">
          <div class="d-flex">
            <div class="position-relative">
              <form class="position-relative form_custom" role="search">
                <input
                  @input="onChangeSearch"
                  class="form-control rounded-1 me-0 search_custom"
                  placeholder="Поиск по таблице"
                  aria-label="Search"
                />
                <span
                  class="position-absolute top-50 end-0 me-2 translate-middle"
                >
                  <SearchIcon />
                </span>
              </form>
            </div>
            <FilterForm
              :types="types"
              :statuses="statuses"
              :accounts="accounts"
              :advertisers="advertisers"
            />
          </div>
          <div class="d-flex">
            <VueDatePicker
              v-model="date"
              locale="ru"
              cancelText="Отмена"
              selectText="Выбрать"
              :format-locale="ru"
              :format="formatedDate"
              range
              multi-calendars
              :enable-time-picker="false"
              placeholder="Выберите период"
              @update:model-value="handleDate"
            />
            <div>
              <button class="btn btn_custom" @click="handleExport">
                <DownloadIcon />
                XLS
              </button>
            </div>
          </div>
        </div>
        <TableForm :creatives="creatives" :is-export="isExport" />
      </div>
      <FooterForm />
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
.nav_custom {
  margin-top: 24px !important;
  margin-bottom: 24px !important;
  border-bottom: 2px solid #dee2e6;
}
.nav_item_custom {
  height: 40px;
}
.a_custom {
  color: #6c757d !important;
}
.a_custom:focus,
.a_custom:hover {
  box-shadow: var(--focus-box-shadow) !important;
  border-color: var(--custom-color) !important;
  color: var(--custom-color) !important;
}
.btn_custom {
  color: var(--custom-color);
  border-color: var(--custom-color);
  width: 82px;
  height: 38px;
  margin-left: 12px;
}
.form_custom {
  margin-right: 12px;
}
.search_custom {
  width: 294px;
  height: 38px;
}
.btn_custom:active {
  background-color: var(--custom-color);
  border-color: var(--custom-color);
  color: white !important;
}
.search_custom:focus {
  box-shadow: var(--focus-box-shadow) !important;
  border-color: var(--custom-color) !important;
}
</style>
