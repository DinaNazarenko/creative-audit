import { defineStore } from 'pinia'

export const useCreativesPageStore = defineStore('creativesPage', {
  state: () => ({
    creativesPerPage: 20,
    currentPage: 1,
  }),

  actions: {
    updateCreativesPerPage(newPage) {
      this.creativesPerPage = newPage
    },
    updateCurrentPage(newPage) {
      this.currentPage = newPage
    },
  },
})
