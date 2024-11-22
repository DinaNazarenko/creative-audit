<script setup>
import { ref } from 'vue'
defineProps({
  types: Array,
})
const isDropdownOpen = ref(false)
const handleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}
</script>
<template>
  <div>
    <div class="dropdown dropdown_custom">
      <button
        class="btn btn-light dropdown-toggle rounded-1 text-secondary text-start form-select button_custom"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        @click.prevent="handleDropdown"
      >
        Тип
      </button>
      <ul
        v-if="isDropdownOpen"
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
  </div>
</template>
<style scoped>
@import '../../assets/main.css';
.dropdown_custom {
  margin-right: 12px;
  width: 147px;
  background-color: #ffffff;
}
.button_custom {
  width: 147px;
}
input {
  cursor: pointer;
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
.ul_types {
  width: 169px;
  height: 176px;
}
.button_custom::after {
  content: none;
}
li {
  border: none;
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
