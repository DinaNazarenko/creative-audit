<script setup>
import { CREATIVE_OPTIONS } from '@/lib/constants'
import QuestionCircleIcon from '@/components/icons/QuestionCircleIcon.vue'
import FullscreenIcon from '@/components/icons/FullscreenIcon.vue'
import { getImageSize } from '@/lib/utils/getImageSize'
import { formatDate } from '@/lib/utils/FormattingDates'
import { ref, watchEffect } from 'vue'

const props = defineProps({
  creative: Object,
})

const creativeOptions = ref(CREATIVE_OPTIONS)
// const imagePath = ref(``);
const size = ref(null);

function getImage(name) {
  return `/images/${name}`
}

watchEffect(async () => {
  try {
    const result = await getImageSize(`/images/${props.creative.media[0].mediaName}`);
    size.value = result;
  } catch (error) {
    console.error('Ошибка при получении размера media:', error);
    size.value = null;
  }
});
</script>
<template>
  <div class="d-flex bg-white rounded-3 p-3 div_custom">
    <div class="col-6 me-3 bg-light d-flex">
      <div
        class="d-flex flex-column justify-content-center align-items-center w-100"
      >
        <img
          :src="getImage(creative.media[0].mediaName)"
          class="img-fluid"
          :alt="creative.media[0].mediaName"
        />
        <p class="mb-0 text-secondary p_custom">
          {{ creative.media[0].mediaName }}
        </p>
        <p class="mb-0 text-secondary">
          {{size?.width}}х{{size?.height}} • {{ formatDate(creative.media[0].dateUploaded, 'DD.MM.YYYY HH:mm') }}
        </p>
      </div>
      <div class="flex-shrink-1"><FullscreenIcon /></div>
    </div>
    <div class="col-6">
      <h4 class="mb-3">Проверка креатива</h4>
      <div class="mb-4">
        <div
          v-for="item in creativeOptions"
          :key="item"
          class="form-check option_custom"
        >
          <input
            class="form-check-input me-1"
            type="checkbox"
            :value="item"
            :id="item"
          />
          <label class="form-check-label" for="firstCheckbox"
            >{{ item }}<code> *</code> <QuestionCircleIcon
          /></label>
        </div>
      </div>
      <div>
        <button class="btn me-3 btn-outline-success btn_custom">Принять</button>
        <button class="btn btn-outline-danger btn_custom">Отклонить</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../../assets/main.css';
.div_custom {
  height: 487px;
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
.btn_custom {
  width: 109px;
  height: 38px;
}
.p_custom {
  margin-top: 12px;
}
p {
  font-size: 12px !important;
}
</style>
