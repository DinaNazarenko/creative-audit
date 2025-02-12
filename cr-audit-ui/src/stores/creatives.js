import { defineStore } from 'pinia'

export const useCreativesStore = defineStore('creatives', {
  state: () => ({
    sortedCreatives: [],
    pendingCount: 0,
  }),
  actions: {
    updatedCreatives(newArray) {
        this.sortedCreatives = newArray
    },
    updatedPendingCount(newArray) {
      this.pendingCount = newArray.filter(item => item.status === 'На проверке').length
  },
  },
})
