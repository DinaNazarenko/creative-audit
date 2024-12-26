<script setup>
import ImagesIcon from '@/components/icons/ImagesIcon.vue'
</script>
<template>
  <div
    class="d-flex flex-column align-items-center justify-content-center p-0 container_custom"
  >
    <ImagesIcon :width="48" :height="48" />
    <h5 class="mb-0">Нет загруженных креативов</h5>
  </div>
</template>
<style scoped>
@import '../../assets/main.css';
.container_custom {
  width: 340px;
  height: 84px;
}
h5 {
  color: #adb5bd;
  margin-top: 12px;
}
</style>
