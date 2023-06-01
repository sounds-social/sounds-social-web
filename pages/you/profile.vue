<template>
  <div class="my-7 mx-3">
    <Profile :user="data?.currentUser" />

    <button class="mt-4 py-1 px-2 border border-solid 
        hover:bg-sky-500 hover:text-white" 
      @click="logout">Logout</button>
  </div>
</template>
<script lang="ts" setup>
import { useNavigationStore } from "~/stores/navigationStore"

definePageMeta({
  middleware: [
    'auth'
  ],
});

const navigationStore = useNavigationStore()

navigationStore.currentNavigationItem = 'own-profile'

const query = gql`
query CurrentProfile {
  currentUser {
    id
    username
    slug
  }
}
`

const { data, error } = await useAsyncQuery(query)

const logout = () => {
  const router = useRouter()

  router.push({ path: '/logout' })
}
</script>
