<template>
  <div>
    <Profile :user="data?.currentUser" />
  </div>
</template>
<script lang="ts" setup>
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
