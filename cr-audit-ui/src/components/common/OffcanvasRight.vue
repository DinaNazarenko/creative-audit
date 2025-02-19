<script setup>
import CopyIcon from '@/components/icons/CopyIcon.vue'
import { useAuditedCreativesStore } from '@/stores/auditedCreatives'
import { formatDate } from '@/lib/utils/FormattingDates'
import { copyToClipboard } from '@/lib/utils/copyToClipboard'
import { getImageSize } from '@/lib/utils/getSize'
import { useRouter } from 'vue-router'
import { computed, watchEffect, reactive } from 'vue'

const router = useRouter()
const id = router.currentRoute.value.params.id

const auditedCreativesStore = useAuditedCreativesStore()

const creative = computed(() => auditedCreativesStore.creative)
const updatedMedia = reactive([])

watchEffect(async () => {
  await auditedCreativesStore.getCreative(id)
})

watchEffect(async () => {
  if (!creative.value?.media) return

  const mediaArray = creative.value.media.map(item => ({
    ...item,
    size: item?.size || [],
  }))

  updatedMedia.splice(0, updatedMedia.length, ...mediaArray)

  try {
    for (const item of updatedMedia) {
      if (item.mediaName) {
        const result = await getImageSize(`/images/${item.mediaName}`)
        item.size = result
      }
    }
  } catch (error) {
    console.error('Ошибка при получении размера media:', error)
  }
})
</script>

<template>
  <div
    class="offcanvas offcanvas-end p-4 wrapper_custom"
    tabindex="-1"
    id="offcanvasRight"
    aria-labelledby="offcanvasRightLabel"
  >
    <div class="offcanvas-header p-0 mb-4">
      <h4 class="offcanvas-title" id="offcanvasRightLabel">Все комментарии</h4>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div
      class="offcanvas-body alert alert-secondary m-0 rounded-1 overflow-auto d-flex justify-content-between alert_custom"
      role="alert"
    >
      <div>
        <p class="m-0">ID заявки: {{ creative?.idApplication }}</p>
        <p class="m-0">Адгруппа: {{ creative?.nameAdGroup }}</p>
        <p class="m-0">Статус: {{ creative?.status }}</p>
        <p class="m-0">Тип: {{ creative?.type }}</p>
        <p class="m-0">Рекламный кабинет: {{ creative?.account }}</p>
        <p class="m-0">Рекламодатель: {{ creative?.advertiser }}</p>
        <p class="m-0">Дата проверки: {{ formatDate(creative?.dateAudit, 'DD.MM.YYYY') }}
        </p>
        <p class="mb-4">Дата направления на проверку:
          {{ formatDate(creative?.dateCreat, 'DD.MM.YYYY') }}
        </p>
        <div v-if="creative?.linkData?.comment" class="mb-4">
          <p class="m-0"><strong>Cсылка на посадочную:</strong></p>
          <p class="m-0">
            <a
              :href="creative?.link"
              target="_blank"
              rel="noopener noreferrer"
              class="text-decoration-none"
            >
              {{ creative?.link }}</a
            >
          </p>
          <p class="m-0">
            {{ creative?.linkData?.comment }}
          </p>
        </div>
        <div v-for="item in updatedMedia" :key="item" class="mb-4">
          <div v-if="item.comment">
            <p class="m-0">
              <strong
                >Креатив {{ item?.mediaName }}, {{ item?.size?.width }}х{{
                  item?.size?.height
                }}:</strong
              >
            </p>
            <p class="m-0">
              {{ item?.comment }}
            </p>
          </div>
        </div>
      </div>
      <div>
        <CopyIcon
          width="24px"
          height="24px"
          @click="copyToClipboard(creative, updatedMedia)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../../assets/main.css';
.wrapper_custom {
  width: 900px;
}
h4 {
  line-height: 28.8px;
}
button:focus {
  box-shadow: none;
}
button {
  height: 24px;
  width: 24px;
}
.alert_custom {
  scrollbar-width: thin;
}
p {
  white-space: pre-wrap;
}
</style>
