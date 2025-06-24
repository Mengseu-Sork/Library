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

<template>
  <div class="p-2 space-y-6">
    <Button @click="openCreateForm" class="px-4 py-2 rounded"
    label="+ Add Category"
    />

    <CategoryTable :categories="categories" @edit="editCategory" @delete="deleteCategory" />

    <Modal v-if="showForm">
      <CategoryForm
        :form="form"
        :isEditing="isEditing"
        @save="saveCategory"
        @cancel="cancelEdit"
      />
    </Modal>
  </div>
</template>
