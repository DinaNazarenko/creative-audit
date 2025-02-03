<script setup>
import { useErrorStore } from '@/stores/errorInfo'
import { useEmailStore } from '@/stores/email'
import { usePasswordStore } from '@/stores/password'
import DangerIcon from '@/components/icons/DangerIcon.vue'
import { watchEffect, watch, ref } from 'vue'

const passwordStore = usePasswordStore()
const emailStore = useEmailStore()
const errorStore = useErrorStore()

const storedEmail = ref('')
const storedPassword = ref('')
const errorInfo = ref('')

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
  <div v-if="errorInfo" class="d-flex justify-content-center">
    <div
      class="alert alert-danger d-flex align-items-center rounded-1 p-3 alert_custom"
      role="alert"
    >
      <DangerIcon />
      <div class="ps-2">{{ errorInfo }}</div>
    </div>
  </div>
</template>

<style scoped>
.alert_custom {
  height: 56px;
  width: 328px;
  margin-bottom: 32px !important;
  border-color: #f5c2c7;
  color: #842029;
}
</style>
