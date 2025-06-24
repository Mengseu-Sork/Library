<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-slate-800 flex items-center">
          <span class="text-4xl mr-3">👨‍💼</span>
          Librarians Management
        </h1>
        <p class="text-slate-600 mt-2">Manage your library staff and their access permissions</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg hover:shadow-xl transition-shadow">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-slate-600 rounded-xl flex items-center justify-center text-white text-xl">
            👨‍💼
          </div>
          <div class="ml-4">
            <p class="text-sm text-slate-600">Total Librarians</p>
            <p class="text-2xl font-bold text-slate-800">{{ librarians.length }}</p>
          </div>
        </div>
      </div>
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg hover:shadow-xl transition-shadow">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white text-xl">
            ✅
          </div>
          <div class="ml-4">
            <p class="text-sm text-slate-600">Active Staff</p>
            <p class="text-2xl font-bold text-slate-800">{{ librarians.length }}</p>
          </div>
        </div>
      </div>
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg hover:shadow-xl transition-shadow">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white text-xl">
            🔐
          </div>
          <div class="ml-4">
            <p class="text-sm text-slate-600">Admin Access</p>
            <p class="text-2xl font-bold text-slate-800">3</p>
          </div>
        </div>
      </div>
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg hover:shadow-xl transition-shadow">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white text-xl">
            📊
          </div>
          <div class="ml-4">
            <p class="text-sm text-slate-600">Departments</p>
            <p class="text-2xl font-bold text-slate-800">5</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Librarian Form -->
    <Modal v-if="showForm" @close="cancelEdit">
      <LibrarianForm
        :formData="form"
        :isEditing="isEditing"
        @submitForm="saveLibrarian"
        @cancelEdit="cancelEdit"
      />
    </Modal>

    <!-- Librarians Table -->
    <LibrarianTable
      :librarians="librarians"
      @editLibrarian="editLibrarian"
      @deleteLibrarian="deleteLibrarian"
      @create="openCreateForm"
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
} from '../api/librarianService'

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
  showForm.value = false
  isEditing.value = false
  form.value = { id: null, name: '', age: '', email: '', password: '' }
}

onMounted(loadLibrarians)
</script>
