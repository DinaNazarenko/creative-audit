import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useErrorStore = defineStore('error', () => {
  const errorInfo = ref('')

  function setError(newError) {
    errorInfo.value = newError
  }

  function getError() {
    return errorInfo.value
  }

  return {
    errorInfo,
    setError,
    getError
  }
})
