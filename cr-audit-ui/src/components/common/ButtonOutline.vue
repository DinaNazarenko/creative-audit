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
    :class="{
      'btn': true,
      'me-3': true,
      'btn-outline-success': btnOutline === 'btn-outline-success',
      'btn-outline-secondary': btnOutline === 'btn-outline-secondary',
      'btn-outline-danger': btnOutline === 'btn-outline-danger',
      'rounded-1': true,
      'width': width || '109px',
      'height': height || '38px',
    }"
    @click="handle"
  >
    {{ title }}
  </button>
</template>

<style scoped></style>
