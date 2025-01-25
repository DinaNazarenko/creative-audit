<script setup>
import { LINK_OPTIONS } from '@/lib/constants'
import QuestionCircleIcon from '@/components/icons/QuestionCircleIcon.vue'
import { ref } from 'vue'

defineProps({
  creative: Object,
})

const linkOptions = ref(LINK_OPTIONS)
</script>
<template>
  <div class="bg-white rounded-3 p-3 div_custom">
    <h4>Проверка ссылки</h4>
    <p>
      <a
        :href="creative.link"
        target="_blank"
        rel="noopener noreferrer"
        class="text-decoration-none"
      >
        {{ creative.link }}</a
      >
    </p>
    <div class="mb-4">
      <div
        v-for="item in linkOptions"
        :key="item"
        class="form-check option_custom"
      >
        <input
          class="form-check-input me-1"
          type="checkbox"
          :value="item"
          :id="item"
        />
        <label class="form-check-label" for="firstCheckbox"
          >{{ item }}<code> *</code> <QuestionCircleIcon
        /></label>
      </div>
    </div>
    <div>
      <button class="btn me-3 btn-outline-success btn_custom">Принять</button>
      <button class="btn btn-outline-danger btn_custom">Отклонить</button>
    </div>
  </div>
</template>

<style scoped>
@import '../../assets/main.css';
.div_custom {
  height: 371px;
}
input {
  cursor: pointer;
}
input:checked {
  background-color: var(--custom-color);
  border-color: var(--custom-color);
  color: white;
}
input:focus {
  box-shadow: var(--focus-box-shadow);
  border-color: var(--custom-color);
}
.option_custom {
  margin-bottom: 12px;
}
.btn_custom {
  width: 109px;
  height: 38px;
}
</style>
