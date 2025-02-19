<script setup>
import { useAuditedCreativesStore } from '@/stores/auditedCreatives'
import { useErrorStore } from '@/stores/errorInfo'
import { useSuccessStore } from '@/stores/successInfo'
import { useModalStore } from '@/stores/modal'
import ButtonOutline from '@/components/common/ButtonOutline.vue'
import ButtonChange from '@/components/common/ButtonChange.vue'
import { MODAL_TEXTS } from '@/lib/constants'
// import { getTimezoneOffset } from '@/lib/utils/FormattingDates'
import { useRouter } from 'vue-router'
import { ref, watchEffect, computed } from 'vue'
import axios from 'axios'

const modalTexts = ref({})

const modalStore = useModalStore()
const errorStore = useErrorStore()
const successStore = useSuccessStore()
const auditedCreativesStore = useAuditedCreativesStore()

const modalStatus = computed(() => modalStore.modalStatus)
const auditedCreative = computed(() => auditedCreativesStore.auditedCreative)
const auditedMedia = computed(() => auditedCreativesStore.auditedMedia)
const auditedLink = computed(() => auditedCreativesStore.auditedLink)

const router = useRouter()

function goToHome() {
  router.push({ name: 'home' })
}

function updateCreativeStatus() {
  if (
    auditedLink.value.status === 'Принято' &&
    auditedMedia.value.every(item => item.status === 'Принято')
  ) {
    auditedCreativesStore.updateAuditedStatus('status', 'Согласовано')
  } else if (
    auditedLink.value.status === 'Отклонено' &&
    auditedMedia.value.every(item => item.status === 'Отклонено')
  ) {
    auditedCreativesStore.updateAuditedStatus('status', 'Отклонено')
  } else if (
    (auditedLink.value.status === 'Принято' &&
      auditedMedia.value.some(item => item.status === 'Отклонено')) ||
    auditedLink.value.status === 'Отклонено'
  ) {
    auditedCreativesStore.updateAuditedStatus('status', 'Частично согласовано')
  }
}

const getCreativeStatus = async () => {
  try {
    updateCreativeStatus()

    const { data } = await axios.get(
      `https://596b6b27365a5903.mokky.dev/creatives/${auditedCreative.value.id}`,
    )

    const updatedMedia = auditedMedia.value.map((item, index) => ({
      ...data.media[index],
      status: item.status,
      comment: item.comment,
      options: item.options,
    }))

    const payload = {
      status: auditedCreative.value.status,
      // dateAudit: new Date().toISOString().replace('Z', getTimezoneOffset()),
      dateAudit: new Date().toISOString(),
      linkData: {
        status: auditedLink.value.status,
        comment: auditedLink.value.comment,
        options: auditedLink.value.options,
      },
      media: updatedMedia,
    }

    await axios.patch(
      `https://596b6b27365a5903.mokky.dev/creatives/${auditedCreative.value.id}`,
      payload,
    )
    goToHome()
    setTimeout(() => {
      successStore.setSuccess('Креативы успешно отправлены')
      auditedCreativesStore.updateAuditedStatusLink('')
      auditedCreativesStore.updateActionStatusLink('')
      auditedCreativesStore.updateUserCommentLink('')
      auditedCreativesStore.clearAuditedLink([])
    }, 1000)
    setTimeout(() => {
      successStore.setSuccess('')
    }, 5000)
  } catch (error) {
    setTimeout(() => {
      errorStore.setError('Ошибка отправки креативов')
    }, 1000)
    setTimeout(() => {
      errorStore.setError('')
    }, 5000)
    console.error('Ошибка отправки креативов:', error.message)
  }
}

watchEffect(() => {
  const statusMap = {
    verified: MODAL_TEXTS[0],
    unverifiedCreative: MODAL_TEXTS[1],
    unverifiedLink: MODAL_TEXTS[2],
    auditCancelled: MODAL_TEXTS[3],
    exit: MODAL_TEXTS[4],
  }

  modalTexts.value = statusMap[modalStatus.value]
})
</script>
<template>
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content modal_custom">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">
            {{ modalTexts?.title }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body body_custom">{{ modalTexts?.bodyText }}</div>
        <div class="modal-footer footer_custom">
          <ButtonOutline
            v-if="modalStatus === 'verified' || modalStatus === 'exit'"
            :title="modalTexts?.buttonLeftText"
            btn-outline="btn-outline-secondary"
            :modal-status="modalStatus"
            :handle="modalStatus === 'exit' ? goToHome : undefined"
          />
          <ButtonChange
            :title="modalTexts?.buttonRightText"
            :modal-status="modalStatus"
            :handle="modalStatus === 'verified' ? getCreativeStatus : undefined"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal_custom {
  border-radius: 4.8px;
}
h5 {
  line-height: 24px;
}
.body_custom {
  min-height: 72px;
  max-height: 120px;
}
.footer_custom {
  height: 63px;
}
button:focus {
  box-shadow: none;
}
</style>
