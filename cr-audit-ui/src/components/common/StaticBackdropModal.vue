<script setup>
import { useModalStore } from '@/stores/modal'
import ButtonOutline from '@/components/common/ButtonOutline.vue'
import ButtonChange from '@/components/common/ButtonChange.vue'
import { MODAL_TEXTS } from '@/lib/constants'
import { useRouter } from 'vue-router'
import { ref, watchEffect, computed } from 'vue'

const modalTexts = ref({})

const modalStore = useModalStore()

const modalStatus = computed(() => modalStore.modalStatus)

const router = useRouter()

function goToHome() {
  router.push({ name: 'home' })
}

watchEffect(() => {
  if (modalStatus.value === 'verified') {
    modalTexts.value = MODAL_TEXTS[0]
  }
  if (modalStatus.value === 'unverifiedCreative') {
    modalTexts.value = MODAL_TEXTS[1]
  }
  if (modalStatus.value === 'unverifiedLink') {
    modalTexts.value = MODAL_TEXTS[2]
  }
  if (modalStatus.value === 'auditCancelled') {
    modalTexts.value = MODAL_TEXTS[3]
  }
  if (modalStatus.value === 'exit') {
    modalTexts.value = MODAL_TEXTS[4]
  }
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
            {{ modalTexts.title }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body body_custom">{{ modalTexts.bodyText }}</div>
        <div class="modal-footer footer_custom">
          <ButtonOutline
            v-if="modalStatus === 'verified'"
            :title="modalTexts.buttonLeftText"
            btn-outline="btn-outline-secondary"
            :modal-status="modalStatus"
          />
          <ButtonOutline
            v-if="modalStatus === 'exit'"
            :title="modalTexts.buttonLeftText"
            btn-outline="btn-outline-secondary"
            :handle="goToHome"
            :modal-status="modalStatus"
          />
          <ButtonChange
            :title="modalTexts.buttonRightText"
            :modal-status="modalStatus"
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
