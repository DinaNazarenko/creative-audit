<script setup>
import { defineProps } from 'vue'
defineProps({
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
      'btn-outline-success': true,
      'rounded-1': true,
      'width': width || '109px',
      'height': height || '38px',
    }"
    @click="handle"
  >
    Принять
  </button>
</template>

<style scoped></style>
