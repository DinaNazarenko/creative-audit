<script setup>
import LoginHeader from '@/components/LoginHeader.vue'
import LoginForm from '@/components/LoginForm.vue'
import SidebarLogo from '@/components/SidebarLogo.vue'
import AlertDanger from '@/components/AlertDanger.vue'
import { usePasswordStore } from '@/stores/password'
import { useErrorStore } from '@/stores/errorInfo'
import { useSuccessStore } from '@/stores/successInfo'
import axios from 'axios'

const onCreatePassword = async () => {
  const errorStore = useErrorStore()
  errorStore.setError('')
  const successStore = useSuccessStore()
  successStore.setSuccess('')
  const passwordStore = usePasswordStore()
  const passwordInfo = passwordStore.getPassword()
  const userId = JSON.parse(localStorage.getItem('userId'))

  try {
    await axios.patch(`https://596b6b27365a5903.mokky.dev/users/${userId.userId}`, {
      password: passwordInfo,
    })
    setTimeout(() => {
      successStore.setSuccess('Ваш новый пароль был успешно сохранён')
    }, 1000)
    setTimeout(() => {
      successStore.setSuccess('')
    }, 4000)
    localStorage.removeItem('userId')
  } catch (error) {
    errorStore.setError('Ошибка сохранения пароля')
    console.error('Ошибка сохранения пароля:', error.message)
  }
}
</script>

<template>
  <div class="row">
    <div class="col-8">
      <div
        class="vh-100 d-flex align-items-center justify-content-center"
        v-auto-animate
      >
        <div>
          <LoginHeader title="Создание нового пароля" />
          <LoginForm
            btn="Сохранить"
            :is-create="true"
            @on-create-password="onCreatePassword"
          />
        </div>
      </div>
      <AlertDanger />
    </div>
    <SidebarLogo />
  </div>
</template>
