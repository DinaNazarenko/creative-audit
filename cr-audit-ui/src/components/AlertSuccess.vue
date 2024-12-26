<script setup>
import { useEmailStore } from '@/stores/email'
import { usePasswordStore } from '@/stores/password'
import { useSuccessStore } from '@/stores/successInfo'
import { watchEffect, watch, ref } from 'vue'

const emailStore = useEmailStore()
const passwordStore = usePasswordStore()
const successStore = useSuccessStore()

const storedEmail = ref('')
const storedPassword = ref('')
const successInfo = ref('')

watchEffect(() => {
  storedEmail.value = emailStore.getEmail()
  successInfo.value = successStore.getSuccess()
  storedPassword.value = passwordStore.getPassword()
})

watch(storedEmail, () => {
  if (successInfo.value) {
    successStore.setSuccess('')
  }
})

watch(storedPassword, () => {
  if (successInfo.value) {
    successStore.setSuccess('')
  }
})
</script>

<template>
  <div class="d-flex justify-content-center">
    <svg xmlns="http://www.w3.org/2000/svg" class="d-none">
      <symbol id="check-circle-fill" viewBox="0 0 16 16">
        <path
          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
        />
      </symbol>
    </svg>
    <div
      v-if="successInfo && storedEmail && !storedPassword"
      class="alert alert-success d-flex align-items-center alert_reset_custom"
      role="alert"
    >
      <svg
        class="bi flex-shrink-0 me-2 icon_custom"
        role="img"
        aria-label="Success:"
      >
        <use xlink:href="#check-circle-fill" />
      </svg>
      <div>
        Отправили вам письмо с ссылкой для восстановления пароля. <br />Если
        письма нет на почте <strong>{{ storedEmail }}</strong
        >, загляните в папку "Спам".
      </div>
    </div>
    <div
      v-if="successInfo && storedPassword"
      class="alert alert-success d-flex align-items-center alert_create_custom"
      role="alert"
    >
      <svg
        class="bi flex-shrink-0 me-2 icon_custom"
        role="img"
        aria-label="Success:"
      >
        <use xlink:href="#check-circle-fill" />
      </svg>
      <div>{{ successInfo }}</div>
    </div>
  </div>
</template>

<style scoped>
.icon_custom {
  height: 16px;
  width: 16px;
}
.alert_reset_custom {
  height: 82px;
  width: 642px;
  padding: 16px;
  margin-bottom: 32px !important;
}
.alert_create_custom {
  height: 58px;
  width: 402px;
  padding: 16px;
  margin-bottom: 32px !important;
}
</style>
