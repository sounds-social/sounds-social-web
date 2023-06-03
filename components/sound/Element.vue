<template>
  <div>
    <div class="inline-block align-top">
      <div class="mr-1 inline-block align-top cursor-pointer" @click="store.playOrPause(sound.id)">
        <PlayCircleIcon v-if="!store.isPlaying(sound.id)" class="h-8 w-8 text-blue-500" />
        <PauseCircleIcon v-if="store.isPlaying(sound.id)" class="h-8 w-8 text-blue-500" />
      </div>

      <div class="inline-block align-middle">
        <h2 class="font-bold text-2xl ">
          <NuxtLink :to="`/sound/${sound.slug}`">
            {{ sound.title }}
          </NuxtLink>
        </h2>
        <h3 class="text-lg text-stone-500">
          <NuxtLink :to="`/profile/${sound.owner.slug}`">
            {{ sound.owner.displayName }}
          </NuxtLink>
        </h3>
      </div> 
    </div>

    <SoundWavesurfer 
      :id="sound.id" 
      :uri="sound.uri" 
      :slug="sound.slug"></SoundWavesurfer>
  </div>
</template>
<script lang="ts" setup>
import { PlayCircleIcon, PauseCircleIcon } from '@heroicons/vue/24/solid';
import { useSoundStore } from '~/stores/soundStore';

const props = defineProps<{
  sound: any
}>()

const store = useSoundStore()
</script>
