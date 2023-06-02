<template>
  <div class="my-7 mx-3">
    <h1 class="text-3xl font-bold">Login</h1>

    <div class="mt-3">
      <input type="text" 
      name="username" 
      placeholder="Username" 
      v-model="username"
      class="border border-solid py-2 px-3 block" />
    </div>

    <div class="mt-3">
      <input type="password" 
      name="password" 
      placeholder="Password" 
      v-model="password"
      class="border border-solid py-2 px-3 block" />
    </div>

    <button class="mt-4 py-1 px-2 border border-solid 
        hover:bg-sky-500 hover:text-white" 
      @click="login">Login</button>

    <button class="mt-4 ml-4 py-1 px-2 border border-solid 
      hover:bg-sky-500 hover:text-white" 
    @click="signUp">Sign up</button>

    <div v-if="errorType" class="text-red-600 py-3">
      Could not {{errorType}}.
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useNavigationStore } from "~/stores/navigationStore"

const navigationStore = useNavigationStore()

navigationStore.currentNavigationItem = 'login'

const username = ref('')
const password = ref('')
const errorType = ref('')

const login = async () => {
  const mutation = gql`
  mutation Login($username: String!, $password: String!) {
  login(loginUserInput: { username: $username, password: $password }) {
    access_token
      user {
        username
        slug
      }
    }
  }`

  const variables = { 
    username: username.value,
    password: password.value 
  }

  const { data, error } = await useAsyncQuery(mutation, variables)

  if (error.value?.message) {
    errorType.value = 'login'
  } else {
    window.localStorage.setItem(
      'auth-token', 
      `Bearer ${data.value?.login.access_token}`
    )

    const router = useRouter()
    router.push({ path: '/you/profile' })
  }
}

const signUp = async () => {
  const mutation = gql`
  mutation SignUp($username: String!, $password: String!) {
    signup(loginUserInput: { username: $username, password: $password }) {
      id
      displayName
      username
    }
  }`

  const variables = { 
    username: username.value,
    password: password.value 
  }

  const { data, error } = await useAsyncQuery(mutation, variables)

  if (error.value?.message) {
    errorType.value = 'sign up'
  } else {
    await login()
  }
}
</script>
