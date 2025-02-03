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
      'btn-outline-danger': true,
      'rounded-1': true,
      'width': width || '109px',
      'height': height || '38px',
    }"
    @click="handle"
  >
  Отклонить
  </button>
</template>

<style scoped></style>
