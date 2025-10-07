// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    items: [],
    itemsLoaded: false,
  }),
  actions: {
    async loadItems() {
      if (this.itemsLoaded) return
      const res = await fetch(import.meta.env.BASE_URL + 'public/assets/items.json')
      this.items = await res.json()
      this.itemsLoaded = true
    } },
})
