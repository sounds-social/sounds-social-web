<template>
  <Profile :user="data.user" />
</template>
<script lang="ts" setup>
const query = gql`
query ProfileBySlug($slug: String!) {
  user(slug: $slug) {
    id
    username
    slug
  }
}
`

const variables = {
  slug: 'user-one'
}

const { data, error } = await useAsyncQuery(query, variables)

console.log(data)
</script>
