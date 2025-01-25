<script setup>
import { GROUP_FIELDS } from '@/lib/constants'
import { usePopover } from '@/lib/utils/popover'
import { computed, nextTick, watch } from 'vue'
const props = defineProps({
  creative: Object,
})

const showsButton = computed(() => {
  return (
    props.creative.status === 'Частично согласовано' ||
    props.creative.status === 'Отклонено'
  )
})

const { updatePopovers } = usePopover()
nextTick(updatePopovers)

watch(
  props.creative,
  () => {
    updatePopovers()
  },
  { deep: true },
)
</script>
<template>
  <div class="d-flex">
    <div class="info_item_min">
      <p class="text-gray-600 m-0 fs_custom">
        {{ GROUP_FIELDS.idApplication }}
      </p>
      <p class="fw-bold m-0 pe-3">{{ creative.idApplication }}</p>
    </div>
    <div class="info_item_min">
      <p class="text-gray-600 m-0 fs_custom">{{ GROUP_FIELDS.status }}</p>
      <p class="fw-bold m-0 pe-3">
        <span
          :class="{
            'badge rounded-pill': true,
            'text-bg-info': true,
            badge_success_custom: creative.status === 'Согласовано',
            badge_danger_custom: creative.status === 'Отклонено',
            badge_warning_custom: creative.status === 'На проверке',
            badge_info_custom: creative.status === 'Частично согласовано',
            badge_light_custom: creative.status === 'Отменено',
          }"
          >{{ creative.status }}</span
        >
      </p>
    </div>
    <div class="info_item_min">
      <p class="text-gray-600 m-0 fs_custom">{{ GROUP_FIELDS.type }}</p>
      <p class="fw-bold m-0 pe-3">{{ creative.type }}</p>
    </div>
    <div class="info_item_max">
      <p class="text-gray-600 m-0 fs_custom">{{ GROUP_FIELDS.email }}</p>
      <p
        class="fw-bold m-0 pe-3 info_item_max text-truncate"
        data-bs-toggle="popover"
        data-bs-trigger="hover focus"
        data-bs-placement="top"
        data-bs-delay="300"
        data-bs-animation="true"
        :data-bs-content="creative.email"
      >
        {{ creative.email }}
      </p>
    </div>
    <div class="info_item_min">
      <p class="text-gray-600 m-0 fs_custom">{{ GROUP_FIELDS.account }}</p>
      <p
        class="fw-bold m-0 pe-3 info_item_min text-truncate"
        data-bs-toggle="popover"
        data-bs-trigger="hover focus"
        data-bs-placement="top"
        data-bs-delay="300"
        data-bs-animation="true"
        :data-bs-content="creative.account"
      >
        {{ creative.account }}
      </p>
    </div>
    <div class="info_item_max">
      <p class="text-gray-600 m-0 fs_custom">{{ GROUP_FIELDS.advertiser }}</p>
      <p
        class="fw-bold m-0 pe-3 info_item_max text-truncate"
        data-bs-toggle="popover"
        data-bs-trigger="hover focus"
        data-bs-placement="top"
        data-bs-delay="300"
        data-bs-animation="true"
        :data-bs-content="creative.advertiser"
      >
        {{ creative.advertiser }}
      </p>
    </div>
    <div class="info_item_min">
      <p class="text-gray-600 m-0 fs_custom">
        {{ GROUP_FIELDS.timeBeforeStart }}
      </p>
      <p class="fw-bold m-0 pe-3">
        {{ creative?.timeBeforeStart ? `${creative?.timeBeforeStart} д` : '—' }}
      </p>
    </div>
    <div v-if="showsButton">
      <button class="btn btn-primary btn_custom">
        Показать все комментарии
      </button>
    </div>
  </div>
</template>

<style scoped>
@import '../../assets/main.css';
.container_custom {
  padding-top: 32px;
  padding-right: 32px;
  padding-left: 32px;
  background-color: #f8f9fa;
}
.info_item_min {
  min-width: 147px;
  max-width: 196px;
}
.info_item_max {
  width: 196px;
}
.fs_custom {
  font-size: 12px;
}
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
.btn_custom {
  background-color: var(--custom-color) !important;
  border-color: var(--custom-color) !important;
  color: white !important;
  border-radius: 4px;
}
</style>
