import { defineStore } from 'pinia'

export const useAuditedCreativesStore = defineStore('auditedCreatives', {
  state: () => ({
    auditedLink: {
      status: '',
      comment: [],
      options: [],
    },
    auditedMedia: {
      status: '',
      comment: [],
      options: [],
    },
  }),
  actions: {
    updateAuditedStatusLink(item) {
      this.auditedLink.status = item
    },
    updateAuditedLink(item) {
      this.auditedLink.options.push(item)
    },
    removeAuditedLink(item) {
      this.auditedLink.options = this.auditedLink.options.filter(option => option !== item)
    },
    updateAuditedMedia(newArray) {
      this.auditedMedia = newArray
    },
  },
})
