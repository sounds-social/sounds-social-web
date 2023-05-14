import { kebabCase } from 'lodash'
import { defineStore } from 'pinia'

const generateMockSound = (id: number) => ({
  id, 
  title: `Track Number ${id}`, 
  uri: 'https://wavesurfer-js.org/example/media/demo.wav',
  owner: { 
    displayName: `Skrillex ${id}`, 
    slug: kebabCase(`Skrillex ${id}`)
  },
})

export const useSoundStore = defineStore('sound', {
  // a function that returns a fresh state
  state: () => ({
    sounds: [
      generateMockSound(1),
      generateMockSound(2),
      generateMockSound(3),
      generateMockSound(4),
      generateMockSound(5),
      generateMockSound(6)
    ],
    wavesurferInstances: {},
    playingId: 0,
    rawIsPlaying: false
  }),
  getters: {
    isPlaying: (state): boolean => {
      return (id: number): boolean => (state.playingId === id && state.rawIsPlaying === true)
    }
  },
  // optional actions
  actions: {
    async loadSounds() {
      // `this` is the store instance
      this.sounds = []
    },
    async play(id: number) {
      const wavesurfer = this.wavesurferInstances[id]

      if (!wavesurfer) {
        throw new Error('Wavesurfer instance not found')
      }

      const wavesurferToPause = this.wavesurferInstances[this.playingId]

      if (this.playingId !== id && wavesurferToPause) {
        wavesurferToPause.pause()
      }

      wavesurfer.play()
      this.playingId = id
      this.rawIsPlaying = true
    },
    async playOrPause(id: number) {
      if (this.rawIsPlaying && this.playingId === id) {
        const wavesurfer = this.wavesurferInstances[id]

        if (!wavesurfer) {
          throw new Error('Wavesurfer instance not found')
        }
  
        wavesurfer.pause()
        this.rawIsPlaying = false
      } else {
        await this.play(id)
      }
    },
    async playNext(id:number) {
      const wavesurfer = this.wavesurferInstances[id + 1]
      
      if (wavesurfer) {
        this.playingId = id + 1
        await this.play(this.playingId)
      }
    },
    async addWavesurferInstance(id: number, instance: any) {
      this.wavesurferInstances[id] = instance
    }
  },
})
