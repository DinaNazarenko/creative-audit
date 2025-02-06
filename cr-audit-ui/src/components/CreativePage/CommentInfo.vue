<script setup>
import { useAuditedCreativesStore } from '@/stores/auditedCreatives'
import CheckBox from '@/components/common/CheckBox.vue'
import ButtonOutline from '@/components/common/ButtonOutline.vue'
import ButtonChange from '@/components/common/ButtonChange.vue'
import { ref, computed, watch, watchEffect } from 'vue'

const props = defineProps({
  linkInfo: {
    type: Boolean,
    default: false,
  },
  mediaInfo: {
    type: Boolean,
    default: false,
  },
  currentAuditedMedia: {
    type: Object,
    default: () => ({
      index: null,
      status: '',
      userActionStatus: '',
      comment: '',
      options: [],
    }),
  },
})

const currentMedia = ref({})

const originalComment = ref({
  link: '',
  media: '',
})

const comment = ref({
  link: '',
  media: '',
})

const auditedCreativesStore = useAuditedCreativesStore()

const auditedLink = computed(() => ({
  status: auditedCreativesStore.auditedLink.status,
  collapseShow: auditedCreativesStore.auditedLink.collapseShow,
  userActionStatus: auditedCreativesStore.auditedLink.userActionStatus,
  comment: auditedCreativesStore.auditedLink.comment,
  options: auditedCreativesStore.auditedLink.options,
}))

watchEffect(() => {
  currentMedia.value = props.currentAuditedMedia || {
    index: null,
    status: '',
    userActionStatus: '',
    comment: '',
    options: [],
  }
})

// Загружаем исходное значение комментария для link
watch(
  () => auditedLink.value?.comment,
  newValue => {
    originalComment.value.link = newValue || ''
    comment.value.link = newValue || ''
  },
  { immediate: true },
)

// Загружаем исходное значение комментария для media
// watch(
//   () => props.mediaInfo.valueOf,
//   newValue => {
//     if (newValue) {
//       watch(
//         () => currentMedia.value.comment,
//         newValue => {
//           originalComment.value.media = newValue || ''
//           comment.value.media = newValue || ''
//         },
//         { immediate: true },
//       )
//     }
//   },
// )

function handleRevoke() {
  // Восстанавливаем исходное значение комментария
  comment.value.link = originalComment.value.link

  auditedCreativesStore.updateAuditedStatusLink('')
  auditedCreativesStore.updateActionStatusLink('')

  // if (props.mediaInfo.valueOf) {
  //   comment.value.media = originalComment.value.media

  //   auditedCreativesStore.updateAuditedStatusMedia(currentMedia.value.index, '')
  //   auditedCreativesStore.updateActionStatusMedia(currentMedia.value.index, '')
  // }
}

function handleSave() {
  if (!comment.value.link.trim()) {
    return
  }

  // Сохраняем изменения в store
  auditedCreativesStore.updateUserCommentLink(comment.value.link)
  auditedCreativesStore.updateActionStatusLink('saved')
  auditedCreativesStore.updateCollapseShowLink(false)

  // Обновляем исходное значение для следующего редактирования
  originalComment.value.link = comment.value.link

  // if (props.mediaInfo.valueOf) {
  //   auditedCreativesStore.updateUserCommentMedia(
  //     currentMedia.value.index,
  //     comment.value.media,
  //   )
  //   auditedCreativesStore.updateActionStatusMedia(
  //     currentMedia.value.index,
  //     'saved',
  //   )

  //   // Обновляем исходное значение для следующего редактирования
  //   originalComment.value.media = comment.value.media
  // }
}

function handleCheckboxChangeLink(event) {
  const isChecked = event.target.checked

  if (isChecked) {
    auditedCreativesStore.updateActionStatusLink('editing')
  } else {
    auditedCreativesStore.updateActionStatusLink('rejecting')
  }

  // if (props.mediaInfo.valueOf) {
  //   const isChecked = event.target.checked

  //   if (isChecked) {
  //     auditedCreativesStore.updateActionStatusMedia(
  //       currentMedia.value.index,
  //       'editing',
  //     )
  //   } else {
  //     auditedCreativesStore.updateActionStatusMedia(
  //       currentMedia.value.index,
  //       'rejecting',
  //     )
  //   }
  // }
}
</script>
<template>
  <div
    v-if="linkInfo && auditedLink.status === 'Отклонено'"
    class="d-flex flex-column div_custom"
  >
    <h5 class="option_custom">Причина отклонения:</h5>
    <CheckBox
      :status="auditedLink.userActionStatus"
      :handle-change="handleCheckboxChangeLink"
    />
    <div>
      <textarea
        v-model="comment.link"
        class="form-control rounded-1 textarea_custom"
        :class="{ 'is-invalid': !comment.link }"
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
