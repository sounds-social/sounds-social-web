<template>
  <div class="bg-sky-800 text-slate-200 py-4 px-3 font-bold">
    <div class="flex">
      <div class="flex-1">
        <NuxtLink to="/">
          Sounds Social
        </NuxtLink>
      </div>
      <div class="flex-initial">
        <NuxtLink to="/you/profile">
          <UserCircleIcon class="h-7 w-7" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { UserCircleIcon } from '@heroicons/vue/24/solid';
</script>
