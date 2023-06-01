<template>
  <div>
    <div v-if="user">
      <h1 class="text-5xl font-bold">{{ user.username }}</h1>
      <h2>User id: {{ user.id }}</h2>
    </div>
    <div class="text-neutral-400 italic text-2xl m-3" v-else>
      Profile not found.
    </div>
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
