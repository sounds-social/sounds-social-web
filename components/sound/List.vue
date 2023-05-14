<template>
  <div class="my-5 p-3 rounded-xl border-4" 
    :key="sound.id" 
    v-for="sound in store.sounds">
      <SoundElement :sound="sound" />
  </div>
</template>
<script lang="ts" setup>
import { useSoundStore } from '~/stores/soundStore';

const store = useSoundStore()

const query = gql`
  query AllSounds {
    sounds {
      id
      title
      slug
      uri
      owner {
        id
        slug
        username
      }
    }
  }
`

const { data, error } = await useAsyncQuery(query)

await store.loadSounds(data.value.sounds)
</script>
