<script setup>
import CreativeStatus from '@/components/common/CreativeStatus.vue'
import ButtonSuccess from '@/components/common/ButtonSuccess.vue'
import ButtonDanger from '@/components/common/ButtonDanger.vue'
import ButtonChange from '@/components/common/ButtonChange.vue'
import { LINK_OPTIONS } from '@/lib/constants'
import { useAuditedCreativesStore } from '@/stores/auditedCreatives'
import { useErrorStore } from '@/stores/errorInfo'
import QuestionCircleIcon from '@/components/icons/QuestionCircleIcon.vue'
import PencilSquareIcon from '@/components/icons/PencilSquareIcon.vue'
import ChevronUpIcon from '@/components/icons/ChevronUpIcon.vue'
import { ref, computed } from 'vue'

defineProps({
  creative: Object,
})

const linkOptions = ref(LINK_OPTIONS)
const isDisabled = ref(false)
const collapseShow = ref(true)
const auditedCreativesStore = useAuditedCreativesStore()
const errorStore = useErrorStore()

const auditedLink = computed(() => ({
  status: auditedCreativesStore.auditedLink.status,
  comment: auditedCreativesStore.auditedLink.comment,
  options: auditedCreativesStore.auditedLink.options,
}))

function handleCheckboxChange(event) {
  errorStore.setError('')

  const titleOption = event.target.id
  if (event.target.checked) {
    auditedCreativesStore.updateAuditedLink(titleOption)
  } else {
    auditedCreativesStore.removeAuditedLink(titleOption)
  }
}

function handleAccept() {
  if (auditedLink.value.options.length === linkOptions.value.length) {
    auditedCreativesStore.updateAuditedStatusLink('Принято')
    isDisabled.value = true
    collapseShow.value = false
  } else {
    errorStore.setError('Не все обязательные поля выбраны')
  }
}

function handleReject() {
  auditedCreativesStore.updateAuditedStatusLink('Отклонено')
  isDisabled.value = true
  errorStore.setError('')
}
function handleСhange() {
  isDisabled.value = false
  auditedCreativesStore.updateAuditedStatusLink('')
}
function toggleCollapseShow() {
  collapseShow.value = !collapseShow.value
}
</script>
<template>
  <div
    :class="{
      'bg-white': true,
      'rounded-3': true,
      'p-3': true,
      accordion: true,
      border_success_custom: auditedLink.status === 'Принято',
      border_danger_custom: auditedLink.status === 'Отклонено',
    }"
    id="accordionPanelsStayOpenExample"
  >
    <div class="accordion-item border-0">
      <div class="accordion-header">
        <button
          class="accordion-button rounded-0 shadow-none bg-white p-0 d-flex justify-content-between align-items-center"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#panelsStayOpen-collapseOne"
          :aria-expanded="collapseShow"
          aria-controls="panelsStayOpen-collapseOne"
        >
          <div>
            <div class="d-flex align-items-center">
              <h4 class="mb-1 me-2">Проверка ссылки</h4>
              <CreativeStatus :status="auditedLink.status" />
            </div>
            <p class="m-0">
              <a
                :href="creative.link"
                target="_blank"
                rel="noopener noreferrer"
                class="text-decoration-none"
              >
                {{ creative.link }}</a
              >
            </p>
          </div>
          <button class="btn p-0 border-0" @click="toggleCollapseShow">
            <PencilSquareIcon v-if="!collapseShow" />
            <ChevronUpIcon v-if="collapseShow" />
          </button>
        </button>
      </div>
      <div
        id="panelsStayOpen-collapseOne"
        class="accordion-collapse collapse show"
      >
        <div class="accordion-body p-0 mt-3">
          <div class="mb-4">
            <div
              v-for="item in linkOptions"
              :key="item"
              class="form-check option_custom"
            >
              <input
                class="form-check-input me-1"
                type="checkbox"
                :value="item"
                :id="item.title"
                @change="handleCheckboxChange"
                :checked="auditedLink.options.includes(item.title)"
                :disabled="isDisabled"
              />
              <label class="form-check-label" for="firstCheckbox"
                >{{ item.title }}<code> * </code>
                <QuestionCircleIcon
                  data-bs-toggle="popover"
                  data-bs-trigger="hover focus"
                  data-bs-placement="top"
                  data-bs-delay="500"
                  data-bs-animation="true"
                  :data-bs-content="item.description"
              /></label>
            </div>
          </div>
          <div v-if="auditedLink.status.length === 0">
            <ButtonSuccess :handle="handleAccept" />
            <ButtonDanger :handle="handleReject" />
          </div>
          <div v-if="auditedLink.status.length > 0">
            <ButtonChange
              title="Изменить решение"
              width="170px"
              :handle="handleСhange"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../../assets/main.css';
button::after {
  content: none;
}
.border_success_custom {
  border-left: 4px solid #198754;
}
.border_danger_custom {
  border-left: 4px solid #dc3545;
}
input {
  cursor: pointer;
}
input:checked {
  background-color: var(--custom-color);
  border-color: var(--custom-color);
  color: white;
}
input:focus {
  box-shadow: var(--focus-box-shadow);
  border-color: var(--custom-color);
}
.option_custom {
  margin-bottom: 12px;
}
</style>
