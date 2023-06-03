<template>
  <div class="mx-3">
    <h1 class="text-5xl font-bold mt-5">Likes for {{ displayName }}</h1>

    <SoundListPure :sounds="sounds" />
  </div>
</template>
<script lang="ts" setup>
import { useSoundStore } from '~/stores/soundStore';

const store = useSoundStore()

const query = gql`
  query SoundsForLikes($slug: String!) {
    user(slug: $slug) {
      id
      displayName
      likes {
        sound {
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
    }
  }
`
const route = useRoute();

const slug = route.params.slug;

const variables = {
  slug
}

const { data, error } = await useAsyncQuery(query, variables)

const sounds = data?.value?.user?.likes.map((like) => like.sound)

const displayName = data?.value?.user?.displayName

await store.loadSounds(sounds)
</script>
