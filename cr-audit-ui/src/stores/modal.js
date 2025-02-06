import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    modalStatus: '',
  }),

  actions: {
    updateModalStatus(newStatus) {
      this.modalStatus = newStatus
    },
  },
})