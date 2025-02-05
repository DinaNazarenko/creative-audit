<script setup>
import { useAuditedCreativesStore } from '@/stores/auditedCreatives'
import QuestionCircleIcon from '@/components/icons/QuestionCircleIcon.vue'
import ButtonOutline from '@/components/common/ButtonOutline.vue'
import ButtonChange from '@/components/common/ButtonChange.vue'
import { ref, computed, watch } from 'vue'

const originalComment = ref('')
const comment = ref('')

const auditedCreativesStore = useAuditedCreativesStore()

const auditedLink = computed(() => ({
  status: auditedCreativesStore.auditedLink.status,
  collapseShow: auditedCreativesStore.auditedLink.collapseShow,
  userActionStatus: auditedCreativesStore.auditedLink.userActionStatus,
  comment: auditedCreativesStore.auditedLink.comment,
  options: auditedCreativesStore.auditedLink.options,
}))

// Загружаем исходное значение комментария
watch(
  () => auditedLink.value.comment,
  newValue => {
    originalComment.value = newValue || ''
    comment.value = newValue || ''
  },
  { immediate: true },
)

function handleRevoke() {
  // Восстанавливаем исходное значение комментария
  comment.value = originalComment.value

  auditedCreativesStore.updateAuditedStatusLink('')
  auditedCreativesStore.updateActionStatusLink('')
}

function handleSave() {
  if (!comment.value.trim()) {
    return
  }

  // Сохраняем изменения в store
  auditedCreativesStore.updateUserCommentLink(comment.value)
  auditedCreativesStore.updateActionStatusLink('saved')
  auditedCreativesStore.updateCollapseShowLink(false)

  // Обновляем исходное значение для следующего редактирования
  originalComment.value = comment.value
}

function handleCheckboxChange(event) {
  const isChecked = event.target.checked

  if (isChecked) {
    auditedCreativesStore.updateActionStatusLink('editing')
  } else {
    auditedCreativesStore.updateActionStatusLink('rejecting')
  }
}
</script>
<template>
  <div
    v-if="auditedLink.status === 'Отклонено'"
    class="d-flex flex-column div_custom"
  >
    <h5 class="option_custom">Причина отклонения:</h5>
    <div
      v-if="auditedLink.userActionStatus === 'rejecting' || auditedLink.userActionStatus === 'editing'"
      class="form-check option_custom"
    >
      <input
        class="form-check-input me-1"
        type="checkbox"
        @change="handleCheckboxChange($event)"
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
    <div>
      <textarea
        v-model="comment"
        class="form-control rounded-1 textarea_custom"
        :class="{ 'is-invalid': !comment }"
        rows="5"
        id="validationTextarea"
        :disabled="
          auditedLink.userActionStatus === 'saved' ||
          auditedLink.userActionStatus === 'rejecting'
        "
      ></textarea>
      <div class="invalid-feedback">Пожалуйста заполните комментарий</div>
    </div>
    <div v-if="auditedLink.userActionStatus !== 'saved'" class="mt-4 ms-auto">
      <ButtonOutline
        title="Отмена"
        btn-outline="btn-outline-secondary"
        :handle="handleRevoke"
      />
      <ButtonChange title="Сохранить" :handle="handleSave" />
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
