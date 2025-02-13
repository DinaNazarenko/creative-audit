import { defineStore } from 'pinia'
import { calculateTimeBetweenDates } from '@/lib/utils/FormattingDates'
import axios from 'axios'

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
    auditedCreative: {
      id: null,
      status: '',
    },
    auditedLink: {
      status: '',
      userActionStatus: '',
      comment: '',
      options: [],
    },
    auditedMedia: [],
    // auditedMedia: Media[] = [];
    creative: null,
    isLoading: false
  }),

  actions: {
    updateAuditedStatus(key, item) {
      this.auditedCreative[key] = item
    },
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
    updateActionStatusMedia(index, item) {
      this.auditedMedia[index].userActionStatus = item
    },
    async getCreative(id) {
      try {
        this.isLoading = true

        const url = `https://596b6b27365a5903.mokky.dev/creatives/${id}`
        const { data } = await axios.get(url)
        
        this.creative = {
          ...data,
          timeBeforeStart: calculateTimeBetweenDates(
            new Date(),
            data.dateStart,
            'DD'
          )
        }
      } catch (error) {
        console.error('Ошибка получения креатива:', error.message)
      } finally {
        this.isLoading = false
      }
    }
  },
})

// userActionStatus:
// exception - все ЧБ приняты, но пользователь отклоняет креатив
// rejecting - стандартное отклонение креатива
// editing - добавить свой комментарий
// saved - решение сохранено
