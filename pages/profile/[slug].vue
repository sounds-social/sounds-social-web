<template>
  <div>
    <Profile :user="data?.user" />
  </div>
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

const route = useRoute()

const variables = {
  slug: route.params.slug
}

const { data, error } = await useAsyncQuery(query, variables)
</script>
