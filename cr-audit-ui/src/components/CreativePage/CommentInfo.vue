<script setup>
import QuestionCircleIcon from '@/components/icons/QuestionCircleIcon.vue'
import ButtonOutline from '@/components/common/ButtonOutline.vue'
import ButtonChange from '@/components/common/ButtonChange.vue'
import { defineProps, ref } from 'vue'

defineProps({})

const comment = ref('')
</script>
<template>
  <div class="d-flex flex-column div_custom">
    <h5 class="option_custom">Причина отклонения:</h5>
    <div class="form-check option_custom">
      <input class="form-check-input me-1" type="checkbox" />
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
    <div>
      <textarea
        v-model="comment"
        class="form-control rounded-1 textarea_custom"
        :class="{ 'is-invalid': !comment }"
        rows="5"
        id="validationTextarea"
      ></textarea>
      <div class="invalid-feedback">Пожалуйста заполните комментарий</div>
    </div>
    <div class="mt-4 ms-auto">
      <ButtonOutline title="Отмена" btn-outline="btn-outline-secondary"/>
      <ButtonChange title="Сохранить" />
    </div>
  </div>
</template>

<style scoped>
.option_custom {
  margin-bottom: 12px;
}
.div_custom {
  width: 858px;
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
:focus {
  box-shadow: var(--focus-box-shadow);
  border-color: var(--custom-color);
}
.textarea_custom:focus,
.textarea_custom:active {
  outline: none;
  box-shadow: none;
}
</style>
