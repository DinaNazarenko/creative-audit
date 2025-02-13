import { defineStore } from 'pinia'
import axios from 'axios'

export const useCreativesStore = defineStore('creatives', {
  state: () => ({
    sortedCreatives: [],
    pendingCount: 0,
  }),
  actions: {
    updatedCreatives(newArray) {
      this.sortedCreatives = newArray
    },
    async getPendingCountCreatives() {
      try {
        const url = `https://596b6b27365a5903.mokky.dev/creatives`
        const { data } = await axios.get(url)

        this.pendingCount = data.filter(
          item => item.status === 'На проверке',
        ).length
      } catch (error) {
        console.error(
          'Ошибка получения количества креативов на проверке:',
          error.message,
        )
      }
    },
  },
})
