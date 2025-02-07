<script setup>
import CreativeStatus from '@/components/common/CreativeStatus.vue'
import CommentInfo from '@/components/CreativePage/CommentInfo.vue'
import ButtonOutline from '@/components/common/ButtonOutline.vue'
import ButtonChange from '@/components/common/ButtonChange.vue'
import { LINK_OPTIONS } from '@/lib/constants'
import { useAuditedCreativesStore } from '@/stores/auditedCreatives'
import { useErrorStore } from '@/stores/errorInfo'
import QuestionCircleIcon from '@/components/icons/QuestionCircleIcon.vue'
import PencilSquareIcon from '@/components/icons/PencilSquareIcon.vue'
import ChevronUpIcon from '@/components/icons/ChevronUpIcon.vue'
import { formatOptions } from '@/lib/utils/formatOptions'
import * as bootstrap from 'bootstrap'
import { ref, computed, onMounted, watch, watchEffect } from 'vue'

const props = defineProps({
  creative: Object,
})

const currentCreative = ref({})
const linkOptions = ref(LINK_OPTIONS)
const collapseRef = ref(null)

const auditedCreativesStore = useAuditedCreativesStore()
const errorStore = useErrorStore()

const auditedLink = computed(() => ({
  status: auditedCreativesStore.auditedLink.status,
  userActionStatus: auditedCreativesStore.auditedLink.userActionStatus,
  collapseShow: auditedCreativesStore.auditedLink.collapseShow,
  comment: auditedCreativesStore.auditedLink.comment,
  options: auditedCreativesStore.auditedLink.options,
}))

watchEffect(() => {
  currentCreative.value = props.creative
  auditedCreativesStore.updateAuditedStatus('id', currentCreative.value.id)
})

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
    auditedCreativesStore.updateCollapseShowLink(false)
    auditedCreativesStore.updateUserCommentLink('')
  } else {
    errorStore.setError('Не все обязательные поля выбраны')
  }
}

function handleReject() {
  errorStore.setError('')
  auditedCreativesStore.updateAuditedStatusLink('Отклонено')

  if (auditedLink.value.options.length === linkOptions.value.length) {
    auditedCreativesStore.updateActionStatusLink('exception')
    auditedCreativesStore.updateUserCommentLink('')
  } else {
    auditedCreativesStore.updateActionStatusLink('rejecting')

    const filteredOptions = linkOptions.value.filter(
      option => !auditedLink.value.options.includes(option.title),
    )

    auditedCreativesStore.updateUserCommentLink(formatOptions(filteredOptions))
  }
}
function handleСhange() {
  auditedCreativesStore.updateAuditedStatusLink('')
}

onMounted(() => {
  const collapseElement = collapseRef.value
  const collapseInstance = new bootstrap.Collapse(collapseElement, {
    toggle: false,
  })

  watch(
    () => auditedLink.value.collapseShow,
    newValue => {
      if (newValue) {
        collapseInstance.show()
      } else {
        collapseInstance.hide()
      }
    },
  )
})

function toggleCollapseShow() {
  if (auditedLink.value.collapseShow) {
    auditedCreativesStore.updateCollapseShowLink(false)
  } else {
    auditedCreativesStore.updateCollapseShowLink(true)
  }
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
          :aria-expanded="auditedLink.collapseShow"
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
            <PencilSquareIcon v-if="!auditedLink.collapseShow" />
            <ChevronUpIcon v-if="auditedLink.collapseShow" />
          </button>
        </button>
      </div>
      <div
        ref="collapseRef"
        id="panelsStayOpen-collapseOne"
        class="accordion-collapse collapse show"
      >
        <div class="accordion-body p-0 mt-3">
          <div>
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
                :disabled="auditedLink.status.length > 0"
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
          <div class="mt-4">
            <CommentInfo :link-info="true"/>
          </div>
          <div v-if="auditedLink.status.length === 0" class="mt-4">
            <ButtonOutline
              title="Принять"
              btn-outline="btn-outline-success"
              :handle="handleAccept"
            />
            <ButtonOutline
              title="Отклонить"
              btn-outline="btn-outline-danger"
              :handle="handleReject"
            />
          </div>
          <div
            class="mt-4"
            v-if="
              auditedLink.status.length > 0 &&
              (auditedLink.userActionStatus.length === 0 ||
                auditedLink.userActionStatus === 'saved')
            "
          >
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
