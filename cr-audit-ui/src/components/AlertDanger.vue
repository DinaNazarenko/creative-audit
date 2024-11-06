<script setup>
import { useErrorStore } from '@/stores/errorInfo'
import { useEmailStore } from '@/stores/email'
import { usePasswordStore } from '@/stores/password'
import { watchEffect, watch, ref } from 'vue'

const errorStore = useErrorStore()
const passwordStore = usePasswordStore()
const emailStore = useEmailStore()

const errorInfo = ref('')
const storedEmail = ref('')
const storedPassword = ref('')

watchEffect(() => {
  storedEmail.value = emailStore.getEmail()
  errorInfo.value = errorStore.getError()
  storedPassword.value = passwordStore.getPassword()
})

watch(storedEmail, () => {
  if (errorInfo.value) {
    errorStore.setError('')
  }
})
watch(storedPassword, () => {
  if (errorInfo.value) {
    errorStore.setError('')
  }
})
</script>
<template>
  <div v-if="errorStore.errorInfo" class="d-flex justify-content-center">
    <svg xmlns="http://www.w3.org/2000/svg" class="d-none">
      <symbol id="exclamation-triangle-fill" viewBox="0 0 16 16">
        <path
          d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
        />
      </symbol>
    </svg>
    <div
      class="alert alert-danger d-flex align-items-center alert_custom"
      role="alert"
    >
      <svg
        class="bi flex-shrink-0 me-2 icon_custom"
        role="img"
        aria-label="Danger:"
      >
        <use xlink:href="#exclamation-triangle-fill" />
      </svg>
      <div>{{ errorStore.errorInfo }}</div>
    </div>
  </div>
</template>

<style scoped>
.icon_custom {
  height: 16px;
  width: 16px;
}
.alert_custom {
  height: 58px;
  width: 402px;
  padding: 16px;
  margin-bottom: 32px !important;
}
</style>
