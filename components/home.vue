<template>
  <div class="px-3">
    <div class="py-5" 
      :key="sound.id" 
      v-for="sound in store.sounds">
      <h2 class="font-bold text-2xl">
        <NuxtLink to="/">
          {{ sound.title }}
        </NuxtLink>
      </h2>
      <h3 class="text-lg text-stone-500">
        <NuxtLink to="/">
          {{ sound.owner.displayName }}
        </NuxtLink>
      </h3>

      <SoundWavesurfer :uri="sound.uri"></SoundWavesurfer>

    </div>
    <p>Current user: {{ data?.currentUser }}.</p>
  </div>
</template>
<script lang="ts" setup>
import { useSoundStore } from '~/stores/soundStore';

const query = gql`
query IsAuthenticated {
    currentUser {
      id
      username
    }
  }
`

const store = useSoundStore()

// TODO: auth-token set localStorage
const variables = { limit: 5 }
const { data, error } = await useAsyncQuery(query, variables)
</script>
