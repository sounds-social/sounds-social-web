<template>
  <div class="my-5 p-3 rounded-xl border-4" 
    :key="sound.id" 
    v-for="sound in sounds">
      <SoundElement :sound="sound" />
  </div>
</template>
<script lang="ts" setup>

const props = defineProps<{
  sounds: any
}>()
</script>
