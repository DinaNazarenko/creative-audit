import { defineStore } from 'pinia'

export const useSortedCreativesStore = defineStore('sortedCreatives', {
  state: () => ({
    sortedCreatives: [],
  }),
  actions: {
    updateSortedCreatives(newArray) {
        this.sortedCreatives = newArray
    },
  },
})
