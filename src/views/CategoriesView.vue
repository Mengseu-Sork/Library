<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-slate-800 flex items-center">
          <span class="text-4xl mr-3">🏷️</span>
          Categories Management
        </h1>
        <p class="text-slate-600 mt-2">Organize and manage your library book categories</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg hover:shadow-xl transition-shadow">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-slate-600 rounded-xl flex items-center justify-center text-white text-xl">
            🏷️
          </div>
          <div class="ml-4">
            <p class="text-sm text-slate-600">Total Categories</p>
            <p class="text-2xl font-bold text-slate-800">{{ categories.length }}</p>
          </div>
        </div>
      </div>
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg hover:shadow-xl transition-shadow">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white text-xl">
            📚
          </div>
          <div class="ml-4">
            <p class="text-sm text-slate-600">Books Categorized</p>
            <p class="text-2xl font-bold text-slate-800">156</p>
          </div>
        </div>
      </div>
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg hover:shadow-xl transition-shadow">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white text-xl">
            📈
          </div>
          <div class="ml-4">
            <p class="text-sm text-slate-600">Most Popular</p>
            <p class="text-2xl font-bold text-slate-800">Fiction</p>
          </div>
        </div>
      </div>
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg hover:shadow-xl transition-shadow">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white text-xl">
            ⭐
          </div>
          <div class="ml-4">
            <p class="text-sm text-slate-600">Active</p>
            <p class="text-2xl font-bold text-slate-800">{{ categories.length }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Category Form -->
    <Modal v-if="showForm" @close="cancelEdit">
      <CategoryForm
        :form="form"
        :isEditing="isEditing"
        @save="saveCategory"
        @cancel="cancelEdit"
      />
    </Modal>

    <!-- Categories Table -->
    <CategoryTable
      :categories="categories"
      @edit="editCategory"
      @delete="deleteCategory"
      @create="openCreateForm"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CategoryForm from '../components/categorys/CategoryForm.vue'
import CategoryTable from '../components/categorys/CategoryTable.vue'
import {
  fetchCategories,
  createCategories,
  updateCategories,
  deleteCategories as apiDeleteCategory
} from '../api/categoryServices'

const categories = ref([])
const form = ref({ id: null, name: '', description: '' })
const isEditing = ref(false)
const showForm = ref(false)

const loadCategories = async () => {
  try {
    const res = await fetchCategories()
    categories.value = res.data
  } catch (error) {
    console.error('Failed to fetch categories:', error)
  }
}

const openCreateForm = () => {
  form.value = { id: null, name: '', description: '' }
  isEditing.value = false
  showForm.value = true
}

const saveCategory = async (data) => {
  try {
    if (isEditing.value) {
      await updateCategories(form.value.id, data)
      const idx = categories.value.findIndex(c => c.id === form.value.id)
      if (idx !== -1) categories.value[idx] = { ...data, id: form.value.id }
    } else {
      const res = await createCategories(data)
      categories.value.push(res.data)
    }
    showForm.value = false
  } catch (error) {
    console.error('Failed to save category:', error)
  }
}

const editCategory = (category) => {
  form.value = { ...category }
  isEditing.value = true
  showForm.value = true
}

const deleteCategory = async (id) => {
  if (!confirm('Are you sure you want to delete this category?')) return
  try {
    await apiDeleteCategory(id)
    categories.value = categories.value.filter(c => c.id !== id)
  } catch (error) {
    console.error('Failed to delete category:', error)
  }
}

const cancelEdit = () => {
  showForm.value = false
  isEditing.value = false
  form.value = { id: null, name: '', description: '' }
}

onMounted(loadCategories)
</script>
