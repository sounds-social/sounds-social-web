<template>
  <ClientOnly>
    <div v-if="sound" class="my-5 p-3 rounded-xl border-4 mx-3">
      <SoundElement :sound="sound" />
    </div> 
    <div class="text-neutral-400 italic text-2xl m-3" v-else>
      Sound not found.
    </div>

    <div class="ml-2">
      <SoundLikeButton :slug="sound.slug" />
      <SoundPlaysDisplay :slug="sound.slug" />

      <div v-if="ownsSound" class="inline-block align-middle">
        <button class="ml-3 border border-solid p-2 
                      rounded font-bold text-gray-600 cursor-pointer"
                @click="showModal($event)"
            >
          Upload cover image
        </button>
      </div>
    </div>

    <dialog id="coverImageForm">
      <form action="http://localhost:3000/upload/sound" 
      method="post"
      @submit="onSubmit($event)">
      
      <h3 class="font-bold text-2xl mb-4">Edit cover image</h3>

      <input type="file" accept="image/*" @change="onFileUpload($event)" />

      <div class="block">
        <button class="inline-block mt-4 p-2 bg-green-400 rounded mr-3">Submit</button>

        <button class="inline-block mt-4 p-2 bg-gray-300 rounded" 
          @click="closeModal($event)">Close</button>
      </div>
    </form>

    </dialog>
  </ClientOnly> 
</template>
<script lang="ts" setup>
import axios from 'axios'

definePageMeta({
  middleware: [
    'auth'
  ],
});

const route = useRoute();

const slug = route.params.slug;

const query = gql`
  query SoundBySlug($slug: String!) {
    sound(slug: $slug) {
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
`;

const variables = { slug };

const { data, error } = await useAsyncQuery(query, variables);

const sound = data?.value?.sound;

const isCurrentUserQuery = gql`
    query IsAuthenticated {
      currentUser {
        id
      }
    }`

const { data: currentUserData } = await useAsyncQuery(isCurrentUserQuery)

const currentUserDataId = currentUserData.value?.currentUser.id;

const ownsSound = sound.owner.id === currentUserDataId;

// modal code

const showModal = (event: Event) => {
  event.preventDefault()
  window.document.querySelector('#coverImageForm')?.showModal()
}

const closeModal = (event: Event) => {
  event.preventDefault()
  window.document.querySelector('#coverImageForm')?.close()
}

let file: any = null

const onFileUpload = (event: any) => {
  if (event.target.files && event.target.files.length > 0) {
    file = event.target.files[0]
  }
}

const onSubmit = async (event: any) => {
  event.preventDefault()
  const formEl = document.querySelector('#coverImageForm > form')


  console.log(formEl)
  if (formEl) {
    const formData = new FormData()
    formData.append('file', file, file.name)
    formData.append('soundId', sound.id)

    const bearerToken = window.localStorage.getItem('auth-token')

    const response = await axios.post(
      'http://localhost:3000/upload/cover-image', 
      formData,
      { headers: { Authorization: bearerToken } }
    )

    if (response.status === 201) {
      window.location.reload()
    }
  }
}
</script>
