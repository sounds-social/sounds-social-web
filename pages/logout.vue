<template>
  <div></div>  
</template>
<script lang="ts" setup>
window.localStorage.removeItem('auth-token')

const router = useRouter()

router.push({ path: '/login' })
</script>
