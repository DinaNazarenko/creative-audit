<script setup>
import QuestionCircleIcon from '@/components/icons/QuestionCircleIcon.vue'
import { PERSONAL_DESCRIPTION } from '@/lib/constants'
import { ref, watchEffect } from 'vue'

defineProps({
  status: String,
  handleChange: Function,
})

const personalDescription = ref('')

watchEffect(() => {
  personalDescription.value = PERSONAL_DESCRIPTION
})
</script>
<template>
  <div
    v-if="status === 'rejecting' || status === 'editing'"
    class="form-check option_custom"
  >
    <input
      class="form-check-input me-1"
      type="checkbox"
      @change="handleChange"
    />
    <label class="form-check-label" for="firstCheckbox"
      >Добавить свой комментарий
      <QuestionCircleIcon
        data-bs-toggle="popover"
        data-bs-trigger="hover focus"
        data-bs-placement="top"
        data-bs-delay="500"
        data-bs-animation="true"
        :data-bs-content="personalDescription"
    /></label>
  </div>
</template>
<style scoped>
@import '../../assets/main.css';
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
</style>

