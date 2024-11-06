<script setup>
import { defineProps } from 'vue'
defineProps({
  title: String
});
</script>
<template>
  <div>
    <img class="rounded mx-auto d-block" src="/am_logo.png" alt="am_logo" />
    <h1 class="text-center h1_custom">{{ title }}</h1>
  </div>
</template>

<style scoped>
.h1_custom {
  margin-top: 8px;
  margin-bottom: 32px;
  width: 352px;
}
</style>
