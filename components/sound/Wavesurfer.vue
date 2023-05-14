<template>
  <div :id="randomId">
  </div>  
</template>
<script lang="ts" setup>
import WaveSurfer from 'wavesurfer.js'
import { useSoundStore } from '~/stores/soundStore';

const props = defineProps<{
  uri: string,
  id: string;
}>()

const randomNumber = Math.random().toString().replace('.', '')

const randomId = `wavesurfer-${randomNumber}`

const store = useSoundStore()

onMounted(() => {
  const wavesurfer = WaveSurfer.create({
    container: `#${randomId}`,
    responsive: true
  })

  wavesurfer.on('seek', () => {
    store.play(props.id)
  })

  wavesurfer.load(props.uri)

  store.addWavesurferInstance(props.id, wavesurfer)
})
</script>
