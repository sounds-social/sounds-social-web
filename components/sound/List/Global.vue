<template>
  <SoundListPure :sounds="sounds" />
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
        displayName
      }
    }
  }
`

const { data, error } = await useAsyncQuery(query)

await store.loadSounds(data.value.sounds)

const sounds = data.value.sounds
</script>
