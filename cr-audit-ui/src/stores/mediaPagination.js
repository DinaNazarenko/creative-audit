import { defineStore } from 'pinia'

export const useMediaSlideStore = defineStore('mediaSlide', {
  state: () => ({
    currentSlide: 0,
  }),

  actions: {
    updateCurrentSlide(newSlide) {
      this.currentSlide = newSlide
    },
  },
})
