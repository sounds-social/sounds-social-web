import { defineStore } from 'pinia'

export const useSoundStore = defineStore('sound', {
  // a function that returns a fresh state
  state: () => ({
    sounds: [],
    wavesurferInstances: {},
    playingId: 0,
    rawIsPlaying: false
  }),
  getters: {
    isPlaying: (state): Function => {
      return (id: number): boolean => (state.playingId === id && state.rawIsPlaying === true)
    }
  },
  // optional actions
  actions: {
    async loadSounds(sounds: any) {
      this.sounds = sounds
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
      const wavesurfer = this.wavesurferInstances[id - 1]

      if (wavesurfer) {
        this.playingId = id - 1
        await this.play(this.playingId)
      }
    },
    async addWavesurferInstance(id: number, instance: any) {
      this.wavesurferInstances[id] = instance
    }
  },
})
