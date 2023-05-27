import { defineStore } from 'pinia'

export const useNavigationStore = defineStore('navigation', {
  // a function that returns a fresh state
  state: () => ({
    currentNavigationItem: null
  }),
  
  // optional actions
  actions: {
    async addWavesurferInstance(id: string) {
      this.currentNavigationItem = id
    }
  },
})
