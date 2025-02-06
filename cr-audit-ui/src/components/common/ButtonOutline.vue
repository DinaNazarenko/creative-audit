<script setup>
import { defineProps } from 'vue'
defineProps({
  btnOutline: String,
  title: String,
  width: String,
  height: String,
  handle: Function,
})
</script>
<template>
  <button
  class="btn me-3 my-0 mt-0"
    :class="{
      'btn-outline-success': btnOutline === 'btn-outline-success',
      'btn-outline-secondary': btnOutline === 'btn-outline-secondary',
      'btn-outline-danger': btnOutline === 'btn-outline-danger',
      'rounded-1': true,
      'width': width || '109px',
      'height': height || '38px',
    }"
    @click="handle"
    :data-bs-dismiss="title === 'Отмена' ? 'modal' : undefined"
  >
    {{ title }}
  </button>
</template>

<style scoped></style>
