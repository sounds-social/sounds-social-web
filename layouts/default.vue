<template>
  <div>
    <ClientOnly>
      <AppHeader />
      <slot />
      <AppFooter />
    </ClientOnly>
  </div>
</template>
<script lang="ts" setup>
</script>
