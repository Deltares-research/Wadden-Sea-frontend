// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    items: [],
    itemsLoaded: false,
    entity: null,
  }),
  actions: {
    async loadItems() {
      if (this.itemsLoaded) return
      const res = await fetch(import.meta.env.BASE_URL + 'assets/items.json')
      this.items = await res.json()
      this.itemsLoaded = true
    },
    setEntity(entity) {
      this.entity = entity
    },
  },
})
