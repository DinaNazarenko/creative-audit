import { defineStore } from 'pinia'

export const useTableFiltersStore = defineStore('tableFilters', {
  state: () => ({
    statuses: new Set(),
    types: new Set(),
    accounts: new Set(),
    advertisers: new Set(),
  }),
  actions: {
    updateTableFilters(filterKey, key) {
      this[filterKey].add(key)
    },
    removeTableFilters(filterKey, key) {
      this[filterKey].delete(key)
    },
  },
})
