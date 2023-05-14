<template>
  <div class="mx-3">
    <SoundList />
    <p>Current user: {{ data?.currentUser }}.</p>
  </div>
</template>
<script lang="ts" setup>

const query = gql`
query IsAuthenticated {
    currentUser {
      id
      username
    }
  }
`

// TODO: auth-token set localStorage
const variables = { limit: 5 }
const { data, error } = await useAsyncQuery(query, variables)
</script>
