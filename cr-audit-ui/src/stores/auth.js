import { defineStore } from 'pinia'
import axios from 'axios'
import { useUserStore } from '@/stores/userInfo'
import { useErrorStore } from '@/stores/errorInfo'

export const useAuthStore = defineStore('auth', () => {
  const userStore = useUserStore()
  const errorStore = useErrorStore()

  const auth = async payload => {
    errorStore.setError('')
    try {
      const { data } = await axios.post(
        'https://596b6b27365a5903.mokky.dev/auth',
        payload,
      )
      userStore.setUser({
        token: data.token,
        user_id: data.data.user_id,
        email: data.data.email,
      })
      const userInfo = userStore.getUser()
      localStorage.setItem(
        'userToken',
        JSON.stringify({ token: userInfo.token }),
      )
    } catch (error) {
          errorStore.setError(
            'Неверный email или пароль',
          )
          console.error('Ошибка аутентификации:', error.message)
    }
  }
  return { auth }
})
