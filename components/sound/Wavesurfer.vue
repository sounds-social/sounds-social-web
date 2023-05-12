<template>
  <div :id="randomId">
  </div>  
</template>
<script lang="ts" setup>
import WaveSurfer from 'wavesurfer.js'

const props = defineProps<{
  uri: string
}>()

console.log(props)

const randomNumber = Math.random().toString().replace('.', '')

const randomId = `wavesurfer-${randomNumber}`

onMounted(() => {
  const wavesurfer = WaveSurfer.create({
    container: `#${randomId}`
  })

  wavesurfer.load(props.uri)
})
</script>
