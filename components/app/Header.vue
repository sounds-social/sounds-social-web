<template>
  <div class="bg-sky-800 text-slate-200 py-4 px-3 font-bold">
    <div class="flex">
      <div class="flex-1" :class="[
        store.currentNavigationItem === 'index' ? 'text-white' : 'text-zinc-300'
      ]">
        <NuxtLink to="/">
          <MusicalNoteIcon class="h-5 w-5 inline-block align-middle mr-3" />
          <span class="align-middle">Sounds Social</span>
        </NuxtLink>

        <NuxtLink to="/upload/sound" 
        class="ml-8 mr-3 " :class="[
          store.currentNavigationItem === 'upload' ? 'text-white' : 'text-zinc-300'
        ]">
          <ArrowUpTrayIcon class="h-4 w-4 inline-block align-middle mr-3" />
          <span class="align-middle">Upload</span>
        </NuxtLink>
      </div>
      <div class="flex-initial" :class="[
          store.currentNavigationItem === 'own-profile' ? 'text-white' : 'text-zinc-300'
        ]">
        <NuxtLink to="/you/profile">
          <UserCircleIcon class="h-7 w-7"  />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { UserCircleIcon, MusicalNoteIcon, ArrowUpTrayIcon } from '@heroicons/vue/24/solid';
import { useNavigationStore } from '~/stores/navigationStore';

const store = useNavigationStore();
</script>
