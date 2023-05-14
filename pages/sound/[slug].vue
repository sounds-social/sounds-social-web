<template>
  <ClientOnly>
    <div v-if="sound" class="my-5 p-3 rounded-xl border-4 mx-3">
      <SoundElement :sound="sound" />
    </div> 
    <div class="text-neutral-400 italic text-2xl m-3" v-else>
      Sound not found.
    </div>
  </ClientOnly> 
</template>
<script lang="ts" setup>
import { useSoundStore } from "~/stores/soundStore"

const route = useRoute()

const slug = route.params.slug

const query = gql`
  query SoundBySlug($slug: String!) {
    sound(slug: $slug) {
      id
      title
      slug
      uri
      owner {
        id
        slug
        username
      }
    }
  }
`

const variables = { slug }

const { data, error } = await useAsyncQuery(query, variables)

const sound = data?.value?.sound
</script>