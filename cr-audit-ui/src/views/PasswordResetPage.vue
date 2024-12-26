<script setup>
import LoginHeader from '@/components/LoginHeader.vue'
import LoginForm from '@/components/LoginForm.vue'
import SidebarLogo from '@/components/SidebarLogo.vue'
import AlertSuccess from '@/components/AlertSuccess.vue'
import AlertDanger from '@/components/AlertDanger.vue'
import { useEmailStore } from '@/stores/email'
import { useUserStore } from '@/stores/userInfo'
import { useErrorStore } from '@/stores/errorInfo'
import { useSuccessStore } from '@/stores/successInfo'
import axios from 'axios'

const onResetPassword = async () => {
  const emailStore = useEmailStore()
  const storedEmail = emailStore.getEmail()
  const errorStore = useErrorStore()
  errorStore.setError('')
  const successStore = useSuccessStore()
  successStore.setSuccess('')
  try {
    const { data } = await axios.get(
      `https://596b6b27365a5903.mokky.dev/users?email=${storedEmail}`,
    )
    if (data.length > 0) {
      try {
        await axios.post(`/api/send`, {
          email: data[0].email,
        })
        const userStore = useUserStore()
        userStore.setUser({
          user_id: data[0].id,
          email: data[0].email,
        })
        successStore.setSuccess('Пользователь найден')
        const userInfo = userStore.getUser()
        localStorage.setItem(
          'userId',
          JSON.stringify({ userId: userInfo.user_id }),
        )
      } catch (error) {
        errorStore.setError('Ошибка отправки письма для восстановления пароля')
        console.error('Ошибка отправки письма:', error.message)
      }
    }
    if (data.length === 0) {
      errorStore.setError('Пользователь с таким email не найден')
    }
  } catch (error) {
    errorStore.setError('Пользователь с таким email не найден')
    console.error('Пользователь с таким email не найден:', error.message)
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
          <LoginHeader title="Восстановление пароля" />
          <LoginForm
            btn="Сбросить пароль"
            :is-reset="true"
            @on-reset-password="onResetPassword"
          />
        </div>
      </div>
      <AlertSuccess />
      <AlertDanger />
    </div>
    <SidebarLogo />
  </div>
</template>
