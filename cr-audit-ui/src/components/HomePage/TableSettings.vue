<script setup>
import { GROUP_FIELDS } from '@/lib/constants'
import TableSettingsIcon from '@/components/icons/TableSettingsIcon.vue'
import GripVerticalIcon from '@/components/icons/GripVerticalIcon.vue'
import { useTableSettingsStore } from '@/stores/tableSettings'
import { computed } from 'vue'

const tableSettingsStore = useTableSettingsStore()
// Получаем текущие настройки таблицы
const selectedSettings = computed(() => tableSettingsStore.selectedSettings)

const defaultDisabledKeys = ['idApplication', 'nameAdGroup', 'status']

function handleCheckboxChange(event) {
  const key = event.target.id
  if (event.target.checked) {
    tableSettingsStore.updateSelectedSetting(key)
  } else {
    tableSettingsStore.removeSelectedSetting(key)
  }
}
</script>
<template>
  <div class="btn-group position-relative">
    <button
      class="btn btn-light dropdown-toggle mb-1 button_custom"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <TableSettingsIcon />
    </button>
    <ul
      class="dropdown-menu rounded-1 p-0 overflow-auto scroll_custom ul_statuses"
    >
      <li class="dropdown-item li_custom">Настройки таблицы</li>
        <li
          v-for="(value, key) in GROUP_FIELDS"
          :key="key"
          class="dropdown-item position-relative"
          aria-disabled="true"
        >
          <input
            class="form-check-input me-2"
            type="checkbox"
            :value="value"
            :id="key"
            @change="handleCheckboxChange"
            :checked="selectedSettings.includes(key)"
            :disabled="defaultDisabledKeys.includes(key)"
          />
          <label class="form-check-label" :for="key">
            {{ value }}
          </label>
          <span v-if="!defaultDisabledKeys.includes(key)" class="position-absolute top-50 end-0 me-2 translate-middle">
            <GripVerticalIcon />
          </span>
        </li>
    </ul>
  </div>
</template>
<style scoped>
@import '../../assets/main.css';
.button_custom {
  background-color: #ffffff;
  border: none;
}
.ul_statuses {
  width: 319px;
  height: 440px;
  position: absolute;
  top: 30%;
  right: 60px;
  z-index: 1000;
}
.button_custom::after {
  content: none;
}
.li_custom {
  color: #212529;
  font-weight: 500;
  font-size: 16px;
  line-height: 19.2px;
  height: 35px;
}
li {
  border: none;
  height: 40px;
}
input {
  cursor: pointer;
}
.scroll_custom {
  scrollbar-width: thin;
}
li:active {
  background-color: initial !important;
  color: initial !important;
  border-color: initial !important;
}
.li_custom:hover,
button:hover {
  background-color: initial !important;
}
:focus {
  box-shadow: var(--focus-box-shadow);
  border-color: var(--custom-color);
}
input:checked {
  background-color: var(--custom-color);
  border-color: var(--custom-color);
  color: white;
}
svg:hover {
  color: var(--custom-color);
  cursor: pointer;
}
</style>
