import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({
    token: '',
    user_id: '',
    email: ''
  })

  function setUser(newUser) {
    userInfo.value = newUser
  }

  function getUser() {
    return userInfo.value
  }

  return {
    userInfo,
    setUser,
    getUser
  }
})
