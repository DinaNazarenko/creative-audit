<script setup>
import { ref, computed, watchEffect } from 'vue'
import { GROUP_FIELDS } from '@/lib/constants'
import { sortArrayByObject, findSortConfigByField } from '@/lib/utils/sortUtils'
import TableSettings from '@/components/HomePage/TableSettings.vue'
import { useTableSettingsStore } from '@/stores/tableSettings'
import { useTableFiltersStore } from '@/stores/tableFilters'
import { useSortedCreativesStore } from '@/stores/sortedCreatives'
import { useCreativesPageStore } from '@/stores/pagination'
import { formatDate } from '@/lib/utils/FormattingDates'
import { tableFilters } from '@/lib/utils/tableFilters'
import { exportToExcel } from '@/lib/utils/exportToExcel'
import NoCreatives from '@/components/HomePage/NoCreatives.vue'
import SkeletonCreatives from '@/components/HomePage/SkeletonCreatives.vue'
// import { v4 as uuidv4 } from "uuid";

const props = defineProps({
  creatives: Array,
  isExport: Boolean,
  isLoading: Boolean,
})

const sortOrderFields = ref([])
const selectedField = ref('')

const tableSettingsStore = useTableSettingsStore()
const creativesPageStore = useCreativesPageStore()
const selectedSettings = computed(() => tableSettingsStore.selectedSettings)
const creativesPage = computed(() => ({
  creativesPerPage: creativesPageStore.creativesPerPage,
  currentPage: creativesPageStore.currentPage,
  amountCreatives: creativesPageStore.amountCreatives,
}))

const tableFiltersStore = useTableFiltersStore()

const sortedCreativesStore = useSortedCreativesStore()

const filterSettings = computed(() => ({
  statuses: [...tableFiltersStore.statuses],
  types: [...tableFiltersStore.types],
  accounts: [...tableFiltersStore.accounts],
  advertisers: [...tableFiltersStore.advertisers],
  dateRange: [...tableFiltersStore.dateRange],
}))

const getFields = () => {
  return Object.fromEntries(
    Object.entries(GROUP_FIELDS).filter(([key]) =>
      selectedSettings.value.includes(key),
    ),
  )
}

const fields = computed(getFields)

const sortedCreatives = computed(() =>
  sortArrayByObject(
    tableFilters(props.creatives, filterSettings.value),
    findSortConfigByField(sortOrderFields.value, selectedField.value),
  ),
)

const paginatedCreatives = computed(() => {
  const perPage = creativesPage.value.creativesPerPage
  if (typeof perPage === 'string') {
    return sortedCreatives.value
  } else {
    const currentPage = creativesPage.value.currentPage
    let from = (currentPage - 1) * perPage
    let to = from + perPage

    return sortedCreatives.value.slice(from, to)
  }
})

watchEffect(() => {
  sortedCreativesStore.updateSortedCreatives(sortedCreatives.value)
  creativesPageStore.updateAmountCreatives(paginatedCreatives.value.length)
})

function onChangeSort(item) {
  const reverseFields = Object.fromEntries(
    Object.entries(GROUP_FIELDS).map(([k, v]) => [v, k]),
  )

  selectedField.value = reverseFields[item]

  sortOrderFields.value = sortOrderFields.value.map(field => {
    if (field.sortField === selectedField.value) {
      return { ...field, sortOrder: !field.sortOrder }
    }
    return field
  })

  const existingField = sortOrderFields.value.find(
    field => field.sortField === selectedField.value,
  )
  if (!existingField) {
    sortOrderFields.value.push({ sortField: selectedField, sortOrder: true })
  }
  const sortConfig = findSortConfigByField(sortOrderFields.value, selectedField)
  sortedCreatives.value = sortArrayByObject(props.creatives, sortConfig)
}

const triggerExport = async () => {
  try {
    await exportToExcel(sortedCreatives.value)
  } catch (error) {
    console.error('Ошибка при экспорте excel:', error.message)
  }
}

watchEffect(() => {
  if (props.isExport) {
    triggerExport()
  }
})
</script>
<template>
  <div class="table_custom v-auto-animate">
    <div class="overflow-y-auto scroll_custom mb-3 max_table_custom">
      <table class="table table-hover m-0">
        <thead>
          <tr>
            <th
              v-for="item in fields"
              :key="item"
              class="text-truncate th_custom"
              :class="{
                th_id: item === 'ID заявки',
                th_add_group: item === 'Название адгруппы',
              }"
            >
              {{ item }}
              <svg
                @click="onChangeSort(item)"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-gray-600 z-20 position-relative"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"
                />
              </svg>
            </th>
            <th class="p-0 th_settings"></th>
          </tr>
        </thead>
        <template v-if="isLoading">
          <SkeletonCreatives />
        </template>
        <tbody>
          <tr v-for="item in paginatedCreatives" :key="item.id">
            <td class="text-truncate td_id">{{ item.idApplication }}</td>
            <td class="td_add_group">
              <span class="d-inline-block text-truncate span_max">
                {{ item.nameAdGroup }}
              </span>
            </td>
            <td>
              <span
                :class="{
                  'd-inline-block': true,
                  'text-truncate': true,
                  span_min: true,
                  'badge rounded-pill': true,
                  'text-bg-info': true,
                  badge_success_custom: item.status === 'Согласовано',
                  badge_danger_custom: item.status === 'Отклонено',
                  badge_warning_custom: item.status === 'На проверке',
                  badge_info_custom: item.status === 'Частично согласовано',
                }"
                >{{ item.status }}</span
              >
            </td>
            <td v-if="selectedSettings.includes('type')" class="text-truncate">
              {{ item.type }}
            </td>
            <td v-if="selectedSettings.includes('name')">
              <span class="d-inline-block text-truncate span_middle">
                {{ item.name }}
              </span>
            </td>
            <td
              v-if="selectedSettings.includes('amount')"
              class="text-truncate"
            >
              {{ item.amount }}
            </td>
            <td v-if="selectedSettings.includes('email')" class="text-truncate">
              {{ item.email }}
            </td>
            <td
              v-if="selectedSettings.includes('account')"
              class="text-truncate"
            >
              {{ item.account }}
            </td>
            <td v-if="selectedSettings.includes('advertiser')">
              <span class="d-inline-block text-truncate span_middle">
                {{ item.advertiser }}
              </span>
            </td>
            <td
              v-if="selectedSettings.includes('timeBeforeStart')"
              class="text-truncate"
            >
              {{ item?.timeBeforeStart ? `${item?.timeBeforeStart} д` : '—' }}
            </td>
            <td
              v-if="selectedSettings.includes('dateStart')"
              class="text-truncate"
            >
              {{ formatDate(item.dateStart, 'DD.MM.YYYY') }}
            </td>
            <td
              v-if="selectedSettings.includes('dateCreat')"
              class="text-truncate"
            >
              {{ formatDate(item.dateCreat, 'DD.MM.YYYY HH:mm:ss') }}
            </td>
            <td
              v-if="selectedSettings.includes('dateAudit')"
              class="text-truncate"
            >
              {{ formatDate(item.dateAudit, 'DD.MM.YYYY HH:mm:ss') }}
            </td>
            <td
              v-if="selectedSettings.includes('timeToConfirm')"
              class="text-truncate"
            >
              {{
                item.timeToConfirm?.days
                  ? `${item?.timeToConfirm.days} д ${item?.timeToConfirm.hours} ч`
                  : '—'
              }}
            </td>
            <td v-if="selectedSettings.includes('comment')">
              <span class="d-inline-block text-truncate span_max">
                {{ item.comment }}
              </span>
            </td>
            <td v-if="selectedSettings.includes('link')">
              <span class="d-inline-block text-truncate span_max">
                {{ item.link }}
              </span>
            </td>
            <td class="td_settings"></td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="paginatedCreatives.length === 0"
        class="d-flex align-items-center justify-content-center main_container"
      >
        <NoCreatives />
      </div>
    </div>
    <div class="settings_custom">
      <TableSettings />
    </div>
  </div>
</template>

<style scoped>
.table_custom {
  min-height: calc(100vh - 290px);
  max-width: 95vw;
  min-width: 95vw;
  position: relative;
}
.max_table_custom {
  max-height: calc(100vh - 300px);
}
.main_container {
  min-height: calc(100vh - 365px);
}
.scroll_custom {
  scrollbar-width: thin;
  background-color: #ffffff;
}
.span_min {
  max-width: 99px;
}
.span_middle {
  max-width: 202px;
}
.span_max {
  max-width: 252px;
}
svg:hover {
  color: var(--custom-color);
  cursor: pointer;
}
.badge_success_custom {
  background-color: #d1e7dd !important;
  color: #198754 !important;
}
.badge_danger_custom {
  background-color: #f8d7da !important;
  color: #dc3545 !important;
}
.badge_warning_custom {
  background-color: #fff3cd !important;
  color: #ffc107 !important;
}
.badge_info_custom {
  background-color: #e0cffc !important;
  color: #6f42c1 !important;
}
span {
  height: 22px;
}
td {
  padding: 6px;
}
.th_custom {
  position: sticky;
  top: 0;
}
.td_id {
  position: sticky;
  left: 0;
  z-index: 10;
}
.th_id {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 12;
}
.td_add_group {
  position: sticky;
  left: 111px;
  z-index: 10;
  border-right: 1px solid #dee2e6;
}
.th_add_group {
  position: sticky;
  top: 0;
  left: 111px;
  z-index: 15;
  border-right: 1px solid #dee2e6;
}
.th_settings {
  position: sticky;
  top: 0;
  right: 0;
  z-index: 12;
  border-left: 1px solid #dee2e6;
}
.td_settings {
  min-width: 40px;
  position: sticky;
  right: 0;
  z-index: 10;
  border-left: 1px solid #dee2e6;
}
.th_settings::before,
.td_settings::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-left: 1px solid #dee2e6;
}
.th_add_group::before,
.td_add_group::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-right: 1px solid #dee2e6;
}
.settings_custom{
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1030;
}
</style>
