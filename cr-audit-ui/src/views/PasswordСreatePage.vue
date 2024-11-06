<script setup>
import LoginHeader from '@/components/LoginHeader.vue'
import LoginForm from '@/components/LoginForm.vue'
import SidebarLogo from '@/components/SidebarLogo.vue'
import AlertSuccess from '@/components/AlertSuccess.vue'
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
  const passwordInfo =  passwordStore.getPassword()
  const userId = JSON.parse(localStorage.getItem('userId'))

  try {
    await axios.patch(
      `https://596b6b27365a5903.mokky.dev/users/${userId.userId}`,
      {
        password: passwordInfo,
      },
    )
    successStore.setSuccess('Ваш новый пароль был успешно сохранён')
    localStorage.removeItem('userId');
   
  } catch (error) {
    switch (error.response.data.statusCode) {
      default:
        errorStore.setError('Ошибка сохранения пароля')
        break
    }
    throw new Error(error)
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
      <AlertSuccess />
      <AlertDanger />
    </div>
    <SidebarLogo />
  </div>
</template>
