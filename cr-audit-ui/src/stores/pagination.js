import { defineStore } from 'pinia'

export const useCreativesPageStore = defineStore('creativesPage', {
  state: () => ({
    creativesPerPage: 20,
    currentPage: 1,
    amountCreatives: 0,
  }),

  actions: {
    updateCreativesPerPage(newPage) {
      this.creativesPerPage = newPage
    },
    updateCurrentPage(newPage) {
      this.currentPage = newPage
    },
    updateAmountCreatives(amount) {
      this.amountCreatives = amount
    },
  },
})
