import { defineStore } from 'pinia'

// Определение типа для одного креатива
// interface Media {
//   index: number;
//   status: string;
//   userActionStatus: string;
//   comment: string;
//   options: string[];
// }

export const useAuditedCreativesStore = defineStore('auditedCreatives', {
  state: () => ({
    auditedLink: {
      status: '',
      collapseShow: true,
      userActionStatus: '',
      comment: '',
      options: [],
    },
    auditedMedia: [],
    // auditedMedia: Media[] = [];
  }),
  actions: {
    updateAuditedStatusLink(item) {
      this.auditedLink.status = item
    },
    updateActionStatusLink(item) {
      this.auditedLink.userActionStatus = item
    },
    updateAuditedLink(item) {
      this.auditedLink.options.push(item)
    },
    removeAuditedLink(item) {
      this.auditedLink.options = this.auditedLink.options.filter(
        option => option !== item,
      )
    },
    updateUserCommentLink(comment) {
      this.auditedLink.comment = comment
    },
    updateCollapseShowLink(item) {
      this.auditedLink.collapseShow = item
    },
    initializeAuditedMedia(array) {
      this.auditedMedia = array
    },
    updateAuditedStatusMedia(index, item) {
      this.auditedMedia[index].status = item
    },
    updateUserCommentMedia(index, comment) {
      this.auditedMedia[index].comment = comment
    },
    updateAuditedMedia(index, item) {
      this.auditedMedia[index].options.push(item)
    },
    removeAuditedMedia(index, item) {
      this.auditedMedia[index].options = this.auditedMedia[index].options.filter(
        option => option !== item,
      )
    },
  },
})

// userActionStatus:
// exception - все ЧБ приняты, но пользователь отклоняет креатив
// rejecting - стандартное отклонение креатива
// editing - добавить свой комментарий
// saved - решение сохранено
