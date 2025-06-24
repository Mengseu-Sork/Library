<template>
  <form @submit.prevent="submitForm" class="mb-6 space-y-3 bg-white shadow p-4 rounded">
    <!-- Name Input -->
    <div>
      <input
        v-model="localForm.name"
        type="text"
        placeholder="Name"
        class="border p-2 w-full rounded"
      />
      <p v-if="errors.name" class="text-red-600 text-sm mt-1">{{ errors.name }}</p>
    </div>

    <!-- Age Input -->
    <div>
      <input
        v-model.number="localForm.age"
        type="number"
        placeholder="Age"
        class="border p-2 w-full rounded"
      />
      <p v-if="errors.age" class="text-red-600 text-sm mt-1">{{ errors.age }}</p>
    </div>

    <!-- Email Input -->
    <div>
      <input
        v-model="localForm.email"
        type="email"
        placeholder="Email"
        class="border p-2 w-full rounded"
      />
      <p v-if="errors.email" class="text-red-600 text-sm mt-1">{{ errors.email }}</p>
    </div>

    <!-- Password Input -->
    <div>
      <input
        v-model="localForm.password"
        type="password"
        placeholder="Password"
        class="border p-2 w-full rounded"
      />
      <p v-if="errors.password" class="text-red-600 text-sm mt-1">{{ errors.password }}</p>
    </div>

    <!-- Success Alert -->
    <div v-if="successMessage" class="bg-green-100 text-green-800 p-2 rounded mb-3">
      {{ successMessage }}
    </div>

    <!-- Buttons -->
    <div class="flex gap-3">
      <Button
        type="submit"
        :label="isEditing ? 'Update Librarian' : 'Add Librarian'"
        color="blue"
      />
      <Button label="Cancel" color="red" @click="$emit('cancelEdit')" />
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'
const emit = defineEmits(['submitForm', 'cancelEdit'])
const props = defineProps({
  formData: Object,
  isEditing: Boolean,
})

const localForm = ref({ ...props.formData })
const errors = ref({})
const successMessage = ref('')

watch(() => props.formData, (newVal) => {
  localForm.value = { ...newVal }
  errors.value = {}
  successMessage.value = ''
}, { deep: true })

function validate() {
  errors.value = {}
  if (!localForm.value.name) errors.value.name = 'Name is required.'
  if (!localForm.value.age || localForm.value.age <= 0) errors.value.age = 'Valid age is required.'
  if (!localForm.value.email || !/\S+@\S+\.\S+/.test(localForm.value.email))
    errors.value.email = 'Valid email is required.'
  if (!props.isEditing && !localForm.value.password)
    errors.value.password = 'Password is required when adding.'

  return Object.keys(errors.value).length === 0
}

function submitForm() {
  if (!validate()) return

  emit('submitForm', localForm.value)
  successMessage.value = props.isEditing
    ? 'Librarian updated successfully!'
    : 'Librarian added successfully!'

  // Clear success message after 3 seconds
  setTimeout(() => {
    successMessage.value = ''
  }, 3000)
}
</script>
