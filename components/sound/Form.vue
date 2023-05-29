<template>
  <div class="m-3">
    <form id="uploadSoundForm" 
      enctype="multipart/form-data"
      @submit="onSubmit($event)" 
      action="http://localhost:3000/upload/sound" 
      method="post">
      <div :key="field.id" 
      v-for="field in formFields"
      class="mb-5"
      >
        <label>
          <div>{{ field.label }}</div>

          <input 
            :type="field.type" 
            :placeholder="field.placeholder"
            :name="field.name"
            class="h-15 mt-3 border border-gray-200 border-2 rounded-lg p-3 w-72"
            :accept="[field.name === 'file' ? `audio/*` : null]"
            @change="onFileUpload($event)"
          />
        </label>
      </div>

      <button type="submit" class="p-3 rounded-lg text-white bg-sky-600">Upload</button>
    </form>
  </div>
</template>
<script lang="ts" setup>
import axios from 'axios'

const formFields = [
  { 
    id: 'title',
    type: 'text',
    name: 'title',
    label: 'Title *',
    placeholder: 'e.g. Skrillex - Bangarang'
  },
  { 
    id: 'slug',
    type: 'text',
    name: 'slug',
    label: 'Slug (optional)',
    placeholder: 'e.g. skrillex-bangarang'
  },
  { 
    id: 'uri',
    type: 'file',
    label: 'Sound file (.wav, .mp3)',
    name: 'file',
    placeholder: 'e.g. skrillex-bangarang'
  }
]

let file: any = null

const onFileUpload = (event: any) => {
  if (event.target.files && event.target.files.length > 0) {
    file = event.target.files[0]
  }
}

const onSubmit = async (event: any) => {
  event.preventDefault()
  const formEl = document.querySelector('#uploadSoundForm')

  if (formEl) {
    const formData = new FormData()
    formData.append('file', file, file.name)
    formData.append('title', 
      formEl.querySelector('input[name="title"]')?.value
    )
    formData.append('slug', 
      formEl.querySelector('input[name="slug"]')?.value
    )

    const bearerToken = window.localStorage.getItem('auth-token')

    const response = await axios.post(
      'http://localhost:3000/upload/sound', 
      formData,
      { headers: { Authorization: bearerToken } }
    )

    if (response.status === 201) {
      const router = useRouter()

      router.push({ path: '/' })
    }
  }
}
</script>
