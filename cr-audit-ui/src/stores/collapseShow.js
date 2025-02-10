import { defineStore } from 'pinia'

export const useCollapseShowStore = defineStore('collapseShow', {
  state: () => ({
    collapseShow: true,
  }),
  actions: {
    updateCollapseShow(item) {
      this.collapseShow = item
    },
  },
})
