<script setup>

import { defineProps } from 'vue'

defineProps({
  title: String,
  width: String,
  height: String,
  handle: Function,
  shouldHaveModal: Boolean,
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
    :data-bs-toggle="shouldHaveModal ? 'modal' : undefined"
    :data-bs-target="shouldHaveModal ? '#staticBackdrop' : undefined"
    :data-bs-dismiss="(title === 'Закрыть' || title === 'Отмена') ? 'modal' : undefined"
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
