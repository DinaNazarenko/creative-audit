import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePasswordStore = defineStore('password', () => {
  const password = ref('')

  function setPassword(newPassword) {
    password.value = newPassword
  }

  function getPassword() {
    return password.value
  }

  return {
    password,
    setPassword,
    getPassword
  }
})
