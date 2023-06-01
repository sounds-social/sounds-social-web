export default defineNuxtRouteMiddleware(async (to) => {
  // skip middleware on server
  if (process.server) return

  const query = gql`
    query IsAuthenticated {
      currentUser {
        id
        username
        slug
      }
    }`

  const { data, error } = await useAsyncQuery(query)

  if (data.value?.currentUser?.id) {
    return
  }

  return navigateTo('/login')
})
