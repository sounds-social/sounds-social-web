<template>
  <div class="my-7 mx-3">
    <div v-if="user">
      <h1 class="text-5xl font-bold">{{ user.username }}</h1>
    </div>
    <div class="text-neutral-400 italic text-2xl m-3" v-else>
      Profile not found.
    </div>

    <div v-if="sounds.length > 0">
      <h2 class="text-2xl font-bold text-neutral-400 my-4">Recent</h2>
      <SoundListPure :sounds="sounds" />
  </div>
  </div>
</template>
<script lang="ts" setup>
import { useSoundStore } from '~/stores/soundStore';

const props = defineProps<{
  user: {
    username: string;
    id: number;
  }
}>()

const user = props.user;

const store = useSoundStore();

const query = gql`
  query SoundsForUser($slug: String!) {
    user(slug: $slug) {
      sounds {
        id
        title
        slug
        uri
        owner {
          id
          slug
          username
          displayName
        }
      }
    }
  }`

const route = useRoute();

let slug = route.params.slug;

if (route.fullPath.includes('you/profile')) {
  slug = user.slug
}

const { data, error } = await useAsyncQuery(query, {
  slug 
});

await store.loadSounds(data.value?.user?.sounds);

const sounds = data.value?.user?.sounds;
</script>
