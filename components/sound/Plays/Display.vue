<template>
  <div class="
      my-3 p-2 px-3 inline-block align-middle text-slate-500
      border border-solid rounded
    "
    v-if="amountOfPlays"
  >
  <div class="inline-block align-middle">{{ amountOfPlays }} plays</div>
  </div>  
</template>
<script lang="ts" setup>
const props = defineProps<{
  slug: string
}>();

const slug = props.slug;

const amountOfPlays = ref(0);

const refreshPlays = async () => {
  const query = gql`
  query LikesForSoundBySlug($slug: String!) {
    sound(slug: $slug) {
      playCount
    }
  }`;

  const variables = { slug };

  const { data, error } = await useAsyncQuery(query, variables);

  amountOfPlays.value = data?.value?.sound?.playCount
}

await refreshPlays()

setInterval(async () => {
  await refreshPlays()
}, 5 * 1000)
</script>
