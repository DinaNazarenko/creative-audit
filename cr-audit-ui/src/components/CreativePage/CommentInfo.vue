<script setup>
import { useAuditedCreativesStore } from '@/stores/auditedCreatives'
import { useCollapseShowStore } from '@/stores/collapseShow'
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
  currentAuditedLink: {
    type: Object,
    default: () => ({
      status: '',
      userActionStatus: '',
      comment: '',
      options: [],
    }),
  },
})

const currentMedia = ref({})
const currentLink = ref({})

const originalComment = ref({
  link: '',
  media: '',
})

const comment = ref({
  link: '',
  media: '',
})

const auditedCreativesStore = useAuditedCreativesStore()
const collapseShowStore = useCollapseShowStore()
const auditedCreative = computed(() => auditedCreativesStore.auditedCreative)

watchEffect(() => {
  currentMedia.value = props.currentAuditedMedia || {
    index: null,
    status: '',
    userActionStatus: '',
    comment: '',
    options: [],
  }
  currentLink.value = props.currentAuditedLink || {
    status: '',
    userActionStatus: '',
    comment: '',
    options: [],
  }
})

const auditedLink = computed(() => ({
  ...currentLink.value,
  ...(auditedCreative.value.status === 'На проверке'
    ? auditedCreativesStore.auditedLink
    : {}),
}))

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
watch(
  () => currentMedia.value?.comment,
  newValue => {
    originalComment.value.media = newValue || ''
    comment.value.media = newValue || ''
  },
  { immediate: true },
)

function handleRevokeLink() {
  // Восстанавливаем исходное значение комментария
  comment.value.link = originalComment.value.link

  auditedCreativesStore.updateAuditedStatusLink('')
  auditedCreativesStore.updateActionStatusLink('')
}

function handleRevokeMedia() {
  comment.value.media = originalComment.value.media

  auditedCreativesStore.updateAuditedStatusMedia(currentMedia.value.index, '')
  auditedCreativesStore.updateActionStatusMedia(currentMedia.value.index, '')
}

function handleSaveLink() {
  if (!comment.value.link.trim()) {
    return
  }
  // Сохраняем изменения в store
  auditedCreativesStore.updateUserCommentLink(comment.value.link)
  auditedCreativesStore.updateActionStatusLink('saved')
  collapseShowStore.updateCollapseShow(false)

  // Обновляем исходное значение для следующего редактирования
  originalComment.value.link = comment.value.link
}

function handleSaveMedia() {
  if (!comment.value.media.trim()) {
    return
  }
  // Сохраняем изменения в store
  auditedCreativesStore.updateUserCommentMedia(
    currentMedia.value.index,
    comment.value.media,
  )
  auditedCreativesStore.updateActionStatusMedia(
    currentMedia.value.index,
    'saved',
  )
  // Обновляем исходное значение для следующего редактирования
  originalComment.value.media = comment.value.media
}

function handleCheckboxChangeLink(event) {
  const isChecked = event.target.checked

  if (isChecked) {
    auditedCreativesStore.updateActionStatusLink('editing')
  } else {
    auditedCreativesStore.updateActionStatusLink('rejecting')
  }
}

function handleCheckboxChangeMedia(event) {
  const isChecked = event.target.checked

  if (isChecked) {
    auditedCreativesStore.updateActionStatusMedia(
      currentMedia.value.index,
      'editing',
    )
  } else {
    auditedCreativesStore.updateActionStatusMedia(
      currentMedia.value.index,
      'rejecting',
    )
  }
}
</script>
<template>
  <div>
    <div
      v-if="linkInfo && auditedLink?.status === 'Отклонено'"
      class="d-flex flex-column div_custom"
    >
      <h5
        v-if="auditedCreative?.status === 'На проверке'"
        class="option_custom"
      >
        Причина отклонения:
      </h5>
      <CheckBox
        :status="auditedLink?.userActionStatus"
        :handle-change="handleCheckboxChangeLink"
      />
      <div>
        <textarea
          v-model="comment.link"
          class="form-control rounded-1 overflow-auto textarea_custom"
          :class="{
            'is-invalid': !comment.link,
            textarea_red: auditedCreative?.status !== 'На проверке',
          }"
          rows="5"
          id="validationTextarea"
          :disabled="
            auditedLink?.userActionStatus === 'saved' ||
            auditedLink?.userActionStatus === 'rejecting' ||
            auditedCreative?.status !== 'На проверке'
          "
        ></textarea>
        <div class="invalid-feedback">Пожалуйста заполните комментарий</div>
      </div>
      <div
        v-if="
          auditedLink?.userActionStatus !== 'saved' &&
          auditedCreative?.status === 'На проверке'
        "
        class="mt-4 ms-auto"
      >
        <ButtonOutline
          title="Отмена"
          btn-outline="btn-outline-secondary"
          :handle="handleRevokeLink"
        />
        <ButtonChange title="Сохранить" :handle="handleSaveLink" />
      </div>
    </div>

    <div
      v-if="mediaInfo && currentMedia.status === 'Отклонено'"
      class="d-flex flex-column div_custom"
    >
      <h5 class="option_custom">Причина отклонения:</h5>
      <CheckBox
        :status="currentMedia.userActionStatus"
        :handle-change="handleCheckboxChangeMedia"
      />
      <div>
        <textarea
          v-model="comment.media"
          class="form-control rounded-1 textarea_custom"
          :class="{ 'is-invalid': !comment.media }"
          rows="5"
          id="validationTextarea"
          :disabled="
            currentMedia.userActionStatus === 'saved' ||
            currentMedia.userActionStatus === 'rejecting'
          "
        ></textarea>
        <div class="invalid-feedback">Пожалуйста заполните комментарий</div>
      </div>
      <div
        v-if="currentMedia.userActionStatus !== 'saved'"
        class="mt-4 ms-auto"
      >
        <ButtonOutline
          title="Отмена"
          btn-outline="btn-outline-secondary"
          :handle="handleRevokeMedia"
        />
        <ButtonChange title="Сохранить" :handle="handleSaveMedia" />
      </div>
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
.textarea_custom {
  scrollbar-width: thin;
}
.textarea_red {
  background-color: #f8d7da;
  border-color: #f5c2c7;
  color: #842029;
  scrollbar-width: thin;
}
</style>
