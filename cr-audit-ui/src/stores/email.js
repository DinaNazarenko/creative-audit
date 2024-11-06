import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEmailStore = defineStore('email', () => {
  const email = ref('')

  function setEmail(newEmail) {
    email.value = newEmail
  }

  function getEmail() {
    return email.value
  }

  return {
    email,
    setEmail,
    getEmail
  }
})
