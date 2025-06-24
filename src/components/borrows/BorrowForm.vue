<template>
  <form @submit.prevent="onSubmit" class="bg-white p-4 rounded-xl shadow space-y-4">
    <div>
      <label class="block mb-1">Member</label>
      <select v-model="form.member_id" required class="w-full border p-2 rounded">
        <option value="">Select Member</option>
        <option v-for="member in members" :key="member.id" :value="member.id">{{ member.name }}</option>
      </select>
    </div>

    <div>
      <label class="block mb-1">Librarian</label>
      <select v-model="form.librarian_id" required class="w-full border p-2 rounded">
        <option value="">Select Librarian</option>
        <option v-for="librarian in librarians" :key="librarian.id" :value="librarian.id">{{ librarian.name }}</option>
      </select>
    </div>

    <div>
      <label class="block mb-1">Book</label>
      <select v-model="form.book_id" required class="w-full border p-2 rounded">
        <option value="">Select Book</option>
        <option v-for="book in books" :key="book.id" :value="book.id">{{ book.title }}</option>
      </select>
    </div>

    <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      Borrow Book
    </button>

    <div v-if="message" :class="success ? 'text-green-600' : 'text-red-600'" class="mt-4">
      {{ message }}
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps(['formData', 'members', 'books', 'librarians', 'isEditing'])
const emit = defineEmits(['submitForm', 'cancelEdit'])

const form = ref({ ...props.formData })

// Sync parent formData to local form when it changes
watch(() => props.formData, (newVal) => {
  form.value = { ...newVal }
})

const onSubmit = () => {
  emit('submitForm', form.value)
}
</script>
