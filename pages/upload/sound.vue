<template>
  <SoundForm />
</template>
<script lang="ts" setup>
import { useNavigationStore } from '~/stores/navigationStore'

definePageMeta({
  middleware: [
    'auth'
  ],
});

const store = useNavigationStore()

store.currentNavigationItem = 'upload'
</script>
