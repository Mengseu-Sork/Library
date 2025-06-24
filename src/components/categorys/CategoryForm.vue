<template>
  <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
    <!-- Form Header -->
    <div class="bg-gradient-to-r from-slate-800 to-slate-700 text-white p-6 rounded-t-2xl">
      <h2 class="text-2xl font-bold flex items-center">
        <span class="text-3xl mr-3">{{ isEditing ? '✏️' : '🏷️' }}</span>
        {{ isEditing ? 'Edit Category' : 'Add New Category' }}
      </h2>
      <p class="text-slate-300 mt-2">{{ isEditing ? 'Update category information' : 'Create a new book category' }}</p>
    </div>

    <!-- Form Body -->
    <form @submit.prevent="submitForm" class="p-9 space-y-6 ">
      <!-- Name Field -->
      <div class="space-y-2">
        <label class="block text-sm font-semibold text-slate-700 items-center">
          <span class="mr-2">🏷️</span>
          Category Name
        </label>
        <input 
          v-model="localForm.name" 
          type="text" 
          placeholder="Enter category name" 
          class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-300 bg-slate-50/50 hover:bg-white"
          required 
        />
      </div>

      <!-- Description Field -->
      <div class="space-y-2">
        <label class="block text-sm font-semibold text-slate-700 flex items-center">
          <span class="mr-2">📝</span>
          Description
        </label>
        <textarea 
          v-model="localForm.description" 
          placeholder="Enter category description (optional)" 
          rows="3"
          class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-300 bg-slate-50/50 hover:bg-white resize-none"
        ></textarea>
      </div>

      <!-- Action Buttons -->
      <div class="flex space-x-3 pt-4">
        <button 
          type="submit" 
          class="flex-1 bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center group"
        >
          <span class="mr-2 group-hover:scale-110 transition-transform">
            {{ isEditing ? '💾' : '🏷️' }}
          </span>
          {{ isEditing ? "Update Category" : "Create Category" }}
        </button>
        
        <button 
          @click="$emit('cancel')" 
          type="button" 
          class="px-6 py-3 border border-slate-300 text-slate-600 rounded-xl font-semibold hover:bg-slate-50 transition-all duration-300 hover:scale-105 flex items-center justify-center group"
        >
          <span class="mr-2 group-hover:scale-110 transition-transform">❌</span>
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

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
