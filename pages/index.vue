<template>
  <ClientOnly>
    <Home />
  </ClientOnly>
</template>
<script lang="ts" setup>
import { useNavigationStore } from '~/stores/navigationStore'

const store = useNavigationStore()

store.currentNavigationItem = 'index'
</script>
