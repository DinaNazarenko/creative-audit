<script setup>
import SelectLanguage from '@/components/SelectLanguage.vue'
import { defineProps, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useEmailStore } from '@/stores/email'
import { usePasswordStore } from '@/stores/password'
import { useRouter } from 'vue-router'

const props = defineProps({
  isReset: Boolean,
  isCreate: Boolean,
  btn: String,
})
const authStore = useAuthStore()
const emailStore = useEmailStore()
const passwordStore = usePasswordStore()
const router = useRouter()
const email = ref('')
const password = ref('')
const isValidate = ref(false)

const validateEmail = () => {
  isValidate.value = !!email.value.trim().length
  emailStore.setEmail(email.value)
}

const validatePassword = () => {
  passwordStore.setPassword(password.value)
}

const emits = defineEmits(['onResetPassword', 'onCreatePassword'])

const handleAuth = async () => {
  await authStore.auth({ email: email.value, password: password.value })
  router.push('/home')
}

const handleButtonClick = () => {
  if (props.isReset) {
    emits('onResetPassword')
  }
  if (props.isCreate) {
    emits('onCreatePassword')
    router.push('/')
  }
  if (!props.isReset && !props.isCreate) {
    handleAuth()
  }
}
</script>

<template>
  <form class="px-4 py-3 form_custom">
    <div
      v-if="!isCreate"
      class="mb-3 needs-validation"
      :class="{ 'was-validated': isValidate }"
      novalidate=""
    >
      <label for="validationCustom01" class="form-label" required>Email</label>
      <input
        @input="validateEmail"
        v-model="email"
        type="email"
        class="form-control"
        id="validationCustom01"
        placeholder="Email"
      />
      <div class="valid-feedback"></div>
      <div class="invalid-feedback">Неправильный email</div>
    </div>
    <div v-if="!isReset" class="mb-3">
      <label for="validationCustom02" class="form-label" required>{{
        isCreate ? 'Новый пароль' : 'Пароль'
      }}</label>
      <input
        @input="validatePassword"
        v-model="password"
        type="password"
        class="form-control"
        id="validationCustom02"
        placeholder="Пароль"
      />
    </div>
    <div
      v-if="!isReset && !isCreate"
      class="mb-3 d-flex justify-content-between form_check_block_custom"
    >
      <div class="form-check form_check_custom">
        <input
          type="checkbox"
          class="form-check-input checkbox_custom"
          id="dropdownCheck"
        />
        <label class="form-check-label" for="dropdownCheck">
          Запомнить меня
        </label>
      </div>
      <a class="btn-link link_custom" href="/password-reset">Забыл(а) пароль</a>
    </div>
      <button
        type="submit"
        class="btn btn-primary mb-3 btn_custom"
        @click="handleButtonClick"
        @click.prevent="handleClick"
      >
        {{ btn }}
      </button>
    <SelectLanguage />
  </form>
</template>

<style scoped>
@import '../assets/main.css';
.form_custom {
  padding: 0 !important;
}
.form_check_block_custom {
  margin-bottom: 32px !important;
}
.form_check_custom {
  margin-bottom: var(--custom-zero);
}
.link_custom {
  color: var(--custom-color);
}
.btn_custom {
  background-color: var(--custom-color);
  border-color: var(--custom-color);
  width: 352px !important;
  height: var(--custom-height);
  margin-top: 32px !important;
  margin-bottom: 32px !important;
}
.checkbox_custom:checked {
  background-color: var(--custom-color);
  border-color: var(--custom-color);
}
:focus {
  box-shadow: var(--focus-box-shadow);
  border-color: var(--custom-color);
}
</style>
