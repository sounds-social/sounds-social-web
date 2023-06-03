<template>
  <div class="my-5 p-3 mx-3  cursor-pointer" 
      :class="[hasLiked ? 'font-bold text-red-500' : 'text-neutral-400']"
      @click="likeOrRemoveLike()">
  
      <div class="inline-block align-middle">
        <HeartIcon class="h-4 w-4" />
      </div>

    <div class="inline-block align-middle ml-1">
      {{likesAmount}} Like{{ likesAmount !== 1 ? 's' : '' }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { HeartIcon } from '@heroicons/vue/20/solid';

const props = defineProps<{
  slug: string
}>();

const slug = props.slug;

const likesAmount = ref(0);
const hasLiked = ref(false);  

const loadLikes = async () => {
  const query = gql`
    query LikesForSoundBySlug($slug: String!) {
      sound(slug: $slug) {
        likes {
          likeId
          currentUserHasLiked
          user { id }
        }
        id 
      }
    }`;

  const variables = { slug };

  const { data, error } = await useAsyncQuery(query, variables);

  likesAmount.value = data?.value?.sound.likes.length;

  hasLiked.value = !!(data?.value?.sound.likes.find(
    like => (like.currentUserHasLiked)
  ))

  return { data, error }
}

await loadLikes()

const likeOrRemoveLike = async () => {
  let {data} = await loadLikes()

  if (hasLiked.value) {
    const query = gql`
      mutation RemoveLike($soundId: Int!) {
        removeLike(soundId: $soundId) {
          sound {
            id
          }
        }
      }
    `

    await useAsyncQuery(query, {
      soundId: data?.value?.sound.id
    });
   } else {
    const query = gql`
    mutation Like($soundId: Int!) {
        like(createLikeInput: { soundId: $soundId }) {
          sound {
            id
          }
          currentUserHasLiked
        }
      }`

    await useAsyncQuery(query, {
      soundId: data?.value?.sound.id
    });
  }

  await loadLikes()
}
</script>
