<script setup>
import { defineProps } from 'vue'

defineProps({
  title: String,
  width: String,
  height: String,
  handle: Function,
  shouldHaveModal: Boolean,
  modalStatus: String,
  isOffcanvasOpen: Boolean,
})
</script>
<template>
  <button
    class="btn btn-primary rounded-1 m-0"
    :class="{
      width: width || '106px',
      height: height || '38px',
    }"
    @click="handle"
    :data-bs-toggle="shouldHaveModal ? 'modal' : isOffcanvasOpen ? 'offcanvas' : undefined"
    :data-bs-target="shouldHaveModal ? '#staticBackdrop' : isOffcanvasOpen ? '#offcanvasRight' : undefined"
    :data-bs-dismiss="modalStatus ? 'modal' : undefined"
    :aria-controls="isOffcanvasOpen ? 'offcanvasRight' : undefined"
  >
    {{ title }}
  </button>
</template>

<style scoped>
@import '../../assets/main.css';
button {
  background-color: var(--custom-color);
  border: 1px solid var(--custom-color);
}
button:hover,
button:active {
  background-color: #ffffff;
  color: var(--custom-color);
}
</style>
