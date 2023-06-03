<template>
  <div class="my-7 mx-3">
    <div v-if="user">
      <h1 class="text-5xl font-bold">{{ user.username }}</h1>
    </div>
    <div class="text-neutral-400 italic text-2xl m-3" v-else>
      Profile not found.
    </div>

    <div class="flex">
      <div class="flex-1">
        <div v-if="sounds.length > 0">
          <h2 class="text-2xl font-bold text-neutral-400 my-4">Recent</h2>
          <SoundListPure :sounds="sounds" />
        </div>
        <div v-else>
          No sounds found.
        </div>
      </div>
      <div class="flex-none w-60 pl-5">
        <h2 class="font-bold text-lg mb-4">
          <NuxtLink :to="`/likes/${slug}`">Likes</NuxtLink> 
        </h2>

        <div>
          <div v-for="like in likes" :key="like.sound.id" class="inline-block">
            <NuxtLink :to="`/sound/${like.sound.slug}`" class="w-24 h-24 mr-2 rounded inline-block cursor-pointer" :class="[
                like.sound.coverUri ? 'bg-contain' : 'bg-gradient-to-r from-cyan-500 to-blue-500',
              ]"
              :style="`${like.sound.coverUri ? `background-image: url(${like.sound.coverUri})` : ''}`"
            >
            </NuxtLink>
          </div>
        </div>

        <NuxtLink 
          :to="`/likes/${slug}`"
          class="text-gray-600 mt-3 ml-1"
          v-if="likesLongerThanFour">See all likes</NuxtLink>
      </div>
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
      likes {
        sound {
          coverUri
          slug
          id
        }
      }

      sounds {
        id
        title
        slug
        uri
        coverUri
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

const likesLength = data.value?.user?.likes.length;

const likesLongerThanFour = likesLength > 4;

const likes = data.value?.user?.likes.slice(0, 4);

</script>
