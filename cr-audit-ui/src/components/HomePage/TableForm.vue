<script setup>
import { ref, computed } from 'vue'
import { GROUP_FIELDS } from '@/lib/constants'
import { sortArrayByObject, findSortConfigByField } from '@/lib/utils/sortUtils'
import TableSettings from '@/components/HomePage/TableSettings.vue'
import { formatDate, calculateTimeBetweenDates } from '@/lib/utils/FormattingDates'
// import { v4 as uuidv4 } from "uuid";

const props = defineProps({
  fields: Array,
  creatives: Array,
})

const sortOrderFields = ref([])
const selectedField = ref('')
const sortedCreatives = computed(() =>
  sortArrayByObject(
    props.creatives,
    findSortConfigByField(sortOrderFields.value, selectedField.value),
  ),
)

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
</script>
<template>
  <div class="table_custom v-auto-animate">
    <div class="overflow-y-auto scroll_custom mb-3">
      <table class="table table-hover overflow-hidden m-0">
        <thead>
          <tr>
            <th v-for="item in fields" :key="item" class="text-truncate">
              {{ item }}
              <svg
                @click="onChangeSort(item)"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-gray-600"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"
                />
              </svg>
            </th>
            <th class="p-0 border_custom">
              <TableSettings />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in sortedCreatives" :key="item.id">
            <td class="text-truncate">{{ item.idApplication }}</td>
            <td>
              <span class="d-inline-block text-truncate span_max">
                {{ item.nameAdGroup }}
              </span>
            </td>
            <td class="border_custom">
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
            <td class="text-truncate">{{ item.type }}</td>
            <td>
              <span class="d-inline-block text-truncate span_middle">
                {{ item.name }}
              </span>
            </td>
            <td class="text-truncate">{{ item.amount }}</td>
            <td class="text-truncate">{{ item.email }}</td>
            <td class="text-truncate">{{ item.account }}</td>
            <td>
              <span class="d-inline-block text-truncate span_middle">
                {{ item.advertiser }}
              </span>
            </td>
            <td class="text-truncate">{{ calculateTimeBetweenDates(item.dateAudit, item.dateCreat) }}</td>
            <td class="text-truncate">{{ formatDate(item.dateStart, 'DD.MM.YYYY') }}</td>
            <td class="text-truncate">{{ formatDate(item.dateCreat, 'DD.MM.YYYY HH:mm:ss') }}</td>
            <td class="text-truncate">{{ formatDate(item.dateAudit, 'DD.MM.YYYY HH:mm:ss') }}</td>
            <td class="text-truncate">{{ calculateTimeBetweenDates(item.dateAudit, item.dateStart) }}</td>
            <td>
              <span class="d-inline-block text-truncate span_max">
                {{ item.comment }}
              </span>
            </td>
            <td>
              <span class="d-inline-block text-truncate span_max">
                {{ item.link }}
              </span>
            </td>
            <td class="border_custom"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.table_custom {
  min-height: calc(100vh - 290px);
  max-width: 95vw;
  min-width: 95vw;
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
.border_custom {
  border-left-width: 1px;
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
</style>
