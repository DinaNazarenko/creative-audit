<script setup>
import { defineProps } from 'vue'
defineProps({
  status: String,
  textTruncate: Boolean,
  spanMin: Boolean,
})
</script>
<template>
  <span
    :class="{
      'text-truncate': textTruncate || false,
      span_min: spanMin || false,
      'badge rounded-pill': true,
      'text-bg-info': true,
      badge_success_custom: status === 'Согласовано' || 'Принято',
      badge_danger_custom: status === 'Отклонено',
      badge_warning_custom: status === 'На проверке',
      badge_info_custom: status === 'Частично согласовано',
      badge_light_custom: status === 'Отменено',
    }"
    >{{ status }}</span
  >
</template>

<style scoped>
@import '../../assets/main.css';
.badge_success_custom {
  background-color: #d1e7dd !important;
  color: #198754 !important;
}
.badge_danger_custom {
  background-color: #f8d7da !important;
  color: #dc3545 !important;
}
.badge_warning_custom {
  background-color: #fff3cd !important;
  color: #ffc107 !important;
}
.badge_info_custom {
  background-color: #e0cffc !important;
  color: #6f42c1 !important;
}
.badge_light_custom {
  background-color: #e9ecef !important;
  color: #6c757d !important;
}
.span_min {
  max-width: 99px;
}
</style>
