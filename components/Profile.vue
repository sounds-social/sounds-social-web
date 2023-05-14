<template>
  <div class="my-7 mx-3">
    <h1 class="text-5xl font-bold">{{ user.username }}</h1>
    <h2>User id: {{ user.id }}</h2>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  user: {
    username: string;
    id: number;
  }
}>()

const user = props.user;
</script>
