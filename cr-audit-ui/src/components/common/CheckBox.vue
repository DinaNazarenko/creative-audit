<script setup>
import QuestionCircleIcon from '@/components/icons/QuestionCircleIcon.vue'

defineProps({
  status: String,
  handleChange: Function,
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
        data-bs-content="test"
    /></label>
  </div>
</template>
