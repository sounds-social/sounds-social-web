<template>
  <div>
    <Profile :user="data?.currentUser" />
  </div>
</template>
<script lang="ts" setup>
import { useNavigationStore } from "~/stores/navigationStore"

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
</script>
