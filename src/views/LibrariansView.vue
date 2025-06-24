<template>
  <div class="max-w-full">
    <h1 class="text-3xl font-bold mb-6 text-blue-700">Librarians</h1>

    <Button
      v-if="!showForm"
      label="➕ Add Librarian"
      color="blue"
      @click="openCreateForm"
      class="mb-4"
    />

    <!-- Show form inside modal -->
    <Modal v-if="showForm" @close="cancelEdit">
      <LibrarianForm
        :formData="form"
        :isEditing="isEditing"
        @submitForm="saveLibrarian"
        @cancelEdit="cancelEdit"
      />
    </Modal>

    <LibrarianTable
      :librarians="librarians"
      @editLibrarian="editLibrarian"
      @deleteLibrarian="deleteLibrarian"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LibrarianForm from '../components/librarians/LibrarianForm.vue'
import LibrarianTable from '../components/librarians/LibrarianTable.vue'
import {
  fetchLibrarians,
  createLibrarian,
  updateLibrarian,
  deleteLibrarian as apiDeleteLibrarian
} from '../servers/librarianService'

const librarians = ref([])
const form = ref({ id: null, name: '', age: '', email: '', password: '' })
const isEditing = ref(false)
const showForm = ref(false)

const loadLibrarians = async () => {
  try {
    const res = await fetchLibrarians()
    librarians.value = res.data
  } catch (error) {
    console.error('Failed to fetch librarians:', error)
  }
}

const openCreateForm = () => {
  form.value = { id: null, name: '', age: '', email: '', password: '' }
  isEditing.value = false
  showForm.value = true
}

const saveLibrarian = async (data) => {
  try {
    if (isEditing.value) {
      await updateLibrarian(form.value.id, data)
      const idx = librarians.value.findIndex(l => l.id === form.value.id)
      if (idx !== -1) librarians.value[idx] = { ...data, id: form.value.id }
    } else {
      const res = await createLibrarian(data)
      librarians.value.push(res.data)
    }
    showForm.value = false
  } catch (error) {
    console.error('Failed to save librarian:', error)
  }
}

const editLibrarian = (librarian) => {
  form.value = { ...librarian }
  isEditing.value = true
  showForm.value = true
}

const deleteLibrarian = async (id) => {
  if (!confirm('Are you sure you want to delete this librarian?')) return
  try {
    await apiDeleteLibrarian(id)
    librarians.value = librarians.value.filter(l => l.id !== id)
  } catch (error) {
    console.error('Failed to delete librarian:', error)
  }
}
const cancelEdit = () => {
  showForm.value = false        // hide the form
  isEditing.value = false       // reset editing state
  form.value = {                // reset form data to empty
    id: null,
    name: '',
    age: '',
    email: '',
    password: ''
  }
}

onMounted(loadLibrarians)
</script>
