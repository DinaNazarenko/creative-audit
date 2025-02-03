<script setup>
import { defineProps } from 'vue'
defineProps({
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
      'btn-primary': true,
      'rounded-1': true,
      'width': width || '106px',
      'height': height || '38px',
    }"
    @click="handle"
  >
    {{ title }}
  </button>
</template>

<style scoped>
@import '../../assets//main.css';
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
