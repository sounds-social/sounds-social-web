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
  slug: string;
}>()

const randomNumber = Math.random().toString().replace('.', '')

const randomId = `wavesurfer-${randomNumber}`

const store = useSoundStore()

const slug = props.slug;

onMounted(() => {
  const wavesurfer = WaveSurfer.create({
    container: `#${randomId}`,
    responsive: true
  })

  wavesurfer.on('seek', () => {
    store.play(props.id)
  })

  wavesurfer.on('finish', () => {
    store.playNext(props.id)
  })

  wavesurfer.on('play', () => {
    setTimeout(() => {
      const query = gql`
          mutation AddPlayCount($slug: String!) {
            addPlayCount(slug: $slug) {
              id
              playCount
            }
          }
        `
      
      const variables = { slug };
      useAsyncQuery(query, variables);
    }, 1000 * 30)
  })

  wavesurfer.load(props.uri)

  store.addWavesurferInstance(props.id, wavesurfer)
})
</script>
