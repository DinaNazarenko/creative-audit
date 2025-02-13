<script setup>
import CreativeStatus from '@/components/common/CreativeStatus.vue'
import ButtonChange from '@/components/common/ButtonChange.vue'
import OffcanvasRight from '@/components/common/OffcanvasRight.vue'
import { GROUP_FIELDS } from '@/lib/constants'
import { computed, ref } from 'vue'

const props = defineProps({
  creative: Object,
})

const isOffcanvasOpen = ref('false')
const showsButton = computed(() => {
  return (
    props.creative?.status === 'Частично согласовано' ||
    props.creative?.status === 'Отклонено'
  )
})

function handleOpenOffcanvas() {
  isOffcanvasOpen.value = true
}

</script>
<template>
  <div class="d-flex justify-content-between">
    <div class="d-flex">
      <div class="info_item_min">
        <p class="text-gray-600 m-0 fs_custom">
          {{ GROUP_FIELDS.idApplication }}
        </p>
        <p class="fw-bold m-0 pe-3">{{ creative?.idApplication }}</p>
      </div>
      <div class="info_item_min">
        <p class="text-gray-600 m-0 fs_custom">{{ GROUP_FIELDS.status }}</p>
        <p class="fw-bold m-0 pe-3">
          <CreativeStatus :status="creative?.status" />
        </p>
      </div>
      <div class="info_item_min">
        <p class="text-gray-600 m-0 fs_custom">{{ GROUP_FIELDS.type }}</p>
        <p class="fw-bold m-0 pe-3">{{ creative?.type }}</p>
      </div>
      <div class="info_item_max">
        <p class="text-gray-600 m-0 fs_custom">{{ GROUP_FIELDS.email }}</p>
        <p
          class="fw-bold m-0 pe-3 info_item_max text-truncate"
          data-bs-toggle="popover"
          data-bs-trigger="hover focus"
          data-bs-placement="bottom"
          data-bs-delay="300"
          data-bs-animation="true"
          :data-bs-content="creative?.email"
        >
          {{ creative?.email }}
        </p>
      </div>
      <div class="info_item_min">
        <p class="text-gray-600 m-0 fs_custom">{{ GROUP_FIELDS.account }}</p>
        <p
          class="fw-bold m-0 pe-3 info_item_min text-truncate"
          data-bs-toggle="popover"
          data-bs-trigger="hover focus"
          data-bs-placement="bottom"
          data-bs-delay="300"
          data-bs-animation="true"
          :data-bs-content="creative?.account"
        >
          {{ creative?.account }}
        </p>
      </div>
      <div class="info_item_max">
        <p class="text-gray-600 m-0 fs_custom">{{ GROUP_FIELDS.advertiser }}</p>
        <p
          class="fw-bold m-0 pe-3 info_item_max text-truncate"
          data-bs-toggle="popover"
          data-bs-trigger="hover focus"
          data-bs-placement="bottom"
          data-bs-delay="300"
          data-bs-animation="true"
          :data-bs-content="creative?.advertiser"
        >
          {{ creative?.advertiser }}
        </p>
      </div>
      <div class="info_item_min">
        <p class="text-gray-600 m-0 fs_custom">
          {{ GROUP_FIELDS.timeBeforeStart }}
        </p>
        <p class="fw-bold m-0 pe-3">
          {{
            creative?.timeBeforeStart ? `${creative?.timeBeforeStart} д` : '—'
          }}
        </p>
      </div>
    </div>
    <div v-if="showsButton">
      <ButtonChange
        title="Показать все комментарии"
        is-offcanvas-open=""
        @click="handleOpenOffcanvas"
      />
      <OffcanvasRight />
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
</style>
