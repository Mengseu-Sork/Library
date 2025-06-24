<template>
  <form @submit.prevent="submitForm" class="space-y-3 bg-white p-4 rounded shadow">
    <h2 class="text-xl font-bold">{{ isEditing ? 'Edit Category' : 'Add Category' }}</h2>
    <input
      v-model="localForm.name"
      type="text"
      placeholder="Category name"
      class="border border-gray-300 p-2 w-full rounded"
      required
    />
    <input
      v-model="localForm.description"
      type="text"
      placeholder="Description"
      class="border border-gray-300 p-2 w-full rounded"
    />
    <div class="flex space-x-2">
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        {{ isEditing ? 'Update' : 'Save' }}
      </button>
      <button type="button" @click="$emit('cancel')" class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
        Cancel
      </button>
    </div>
  </form>
</template>

<script setup>
import { toRefs, reactive, watch } from 'vue'

const props = defineProps({
  form: {
    type: Object,
    required: true
  },
  isEditing: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['save', 'cancel'])
const localForm = reactive({ name: '', description: '' })
watch(() => props.form, (newVal) => {
  localForm.name = newVal.name || ''
  localForm.description = newVal.description || ''
}, { immediate: true })

const submitForm = () => {
  emit('save', { name: localForm.name, description: localForm.description })
}
</script>
