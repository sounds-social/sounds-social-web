import { defineStore } from 'pinia'

const generateMockSound = (id: number) => ({
  id, 
  title: `Track Number ${id}`, 
  uri: 'https://wavesurfer-js.org/example/media/demo.wav',
  owner: { displayName: `Skrillex ${id}` },
})

export const useSoundStore = defineStore('sound', {
  // a function that returns a fresh state
  state: () => ({
    sounds: [
      generateMockSound(1),
      generateMockSound(2),
      generateMockSound(3)
    ]
  }),
  // optional actions
  actions: {
    async loadSounds() {
      // `this` is the store instance
      this.sounds = []
    },
  },
})
