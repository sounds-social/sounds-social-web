<template>
  <div>
    <ClientOnly>
      <AppHeader />
      <slot />
      <AppFooter />
    </ClientOnly>
  </div>
</template>
