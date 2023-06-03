<template>
  <div class="flex">
    <div class="flex-none rounded mr-4"
        :class="[
          sound.coverUri ? 'bg-contain' : 'bg-gradient-to-r from-cyan-500 to-blue-500',
        ]" 
        :style="`${
          sound.coverUri ? `background-image: url(${sound.coverUri})` : ''}`"
      style="width: 200px; height: 200px">
    </div>

    <div class="flex-1 inline-block align-top">
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

      <SoundWavesurfer 
        :id="sound.id" 
        :uri="sound.uri" 
        :slug="sound.slug"></SoundWavesurfer>
    </div>
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
