<script setup>
import ButtonOutline from '@/components/common/ButtonOutline.vue'
import ButtonChange from '@/components/common/ButtonChange.vue'
import { MODAL_TEXTS } from '@/lib/constants'
import { defineProps, ref, watchEffect } from 'vue'

const props = defineProps({
modalStatus: String,
})

const modalTexts = ref({})

watchEffect(() => {
  if (props.modalStatus === 'verified') {
    modalTexts.value = MODAL_TEXTS[0]
  } else if (props.modalStatus === 'unverifiedCreative') {
    modalTexts.value = MODAL_TEXTS[1]
  } else if (props.modalStatus === 'unverifiedLink') {
    modalTexts.value = MODAL_TEXTS[2]
  } else if (props.modalStatus === 'auditCancelled') {
    modalTexts.value = MODAL_TEXTS[3]
  } else {
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
        <div class="modal-body body_custom"> {{ modalTexts.bodyText }}</div>
        <div class="modal-footer footer_custom">
          <ButtonOutline v-if="modalTexts.buttonLeftText"
            :title="modalTexts.buttonLeftText"
            btn-outline="btn-outline-secondary"
          />
          <ButtonChange :title="modalTexts.buttonRightText"/>
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
</style>
