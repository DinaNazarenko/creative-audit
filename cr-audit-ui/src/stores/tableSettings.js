import { defineStore } from 'pinia'

export const useTableSettingsStore = defineStore('tableSettings', {
  state: () => ({
    selectedSettings: [
      'idApplication',
      'nameAdGroup',
      'status',
      'type',
      'name',
      'amount',
      'email',
      'account',
      'advertiser',
      'timeBeforeStart',
      'dateStart',
      'dateCreat',
      'dateAudit',
      'timeToConfirm',
      'comment',
      'link'
    ]
  }),
  actions: {
    updateSelectedSetting(key) {
      this.selectedSettings.push(key)
    },
    removeSelectedSetting(key) {
      this.selectedSettings = this.selectedSettings.filter(item => item !== key)
    }
  }
})
