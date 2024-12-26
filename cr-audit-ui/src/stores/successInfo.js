import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSuccessStore = defineStore('success', () => {
  const successInfo =  ref('')

  function setSuccess(newSuccess) {
    successInfo.value = newSuccess
  }

  function getSuccess() {
    return successInfo.value
  }

  return {
    successInfo,
    setSuccess,
    getSuccess
  }
})
