<template>
  <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4">
    <!-- Form Header -->
    <div class="bg-gradient-to-r from-slate-800 to-slate-700 text-white p-6 rounded-t-2xl">
      <h2 class="text-2xl font-bold flex items-center">
        <span class="text-3xl mr-3">{{ isEditing ? '✏️' : '👨‍💼' }}</span>
        {{ isEditing ? 'Change Librarian Information Here' : 'Add New Librarian Information' }}
      </h2>
      <p class="text-slate-300 mt-2">{{ isEditing ? 'Update librarian details below' : 'Fill in the details for the new staff member' }}</p>
    </div>

    <!-- Form Body -->
    <form @submit.prevent="submitForm" class="p-8 space-y-6">
      <!-- Success Alert -->
      <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl flex items-center mb-6">
        <span class="mr-2">✅</span>
        {{ successMessage }}
      </div>

      <!-- Row 1: Full Name and Email -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-2">
          <label class="block text-sm font-medium text-slate-700">
            Full Name*
          </label>
          <input 
            v-model="localForm.name" 
            type="text" 
            placeholder="Enter full name" 
            class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white"
            :class="{ 'border-red-500 focus:ring-red-500': errors.name }"
          />
          <p v-if="errors.name" class="text-red-600 text-sm flex items-center">
            <span class="mr-1">⚠️</span>
            {{ errors.name }}
          </p>
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-slate-700">
            Age*
          </label>
          <input 
            v-model.number="localForm.age" 
            type="number" 
            placeholder="Enter age" 
            class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white"
            :class="{ 'border-red-500 focus:ring-red-500': errors.age }"
          />
          <p v-if="errors.age" class="text-red-600 text-sm flex items-center">
            <span class="mr-1">⚠️</span>
            {{ errors.age }}
          </p>
        </div>

        
      </div>

      <!-- Row 2: Password (Full Width) -->
      <div class="space-y-2">
        <div class="space-y-2">
          <label class="block text-sm font-medium text-slate-700">
            Email Address*
          </label>
          <input 
            v-model="localForm.email" 
            type="email" 
            placeholder="Enter email address" 
            class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white"
            :class="{ 'border-red-500 focus:ring-red-500': errors.email }"
          />
          <p v-if="errors.email" class="text-red-600 text-sm flex items-center">
            <span class="mr-1">⚠️</span>
            {{ errors.email }}
          </p>
        </div>




        <label class="block text-sm font-medium text-slate-700">
          Password*
        </label>
        <input 
          v-model="localForm.password" 
          type="password" 
          placeholder="Enter secure password" 
          class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white"
          :class="{ 'border-red-500 focus:ring-red-500': errors.password }"
        />
        <p v-if="errors.password" class="text-red-600 text-sm flex items-center">
          <span class="mr-1">⚠️</span>
          {{ errors.password }}
        </p>
      </div>

      <!-- Row 3: Age and Department -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
      </div>

      

      <!-- Action Button -->
      <div class="pt-6">
        <button 
          type="submit" 
          class="w-full bg-slate-600 hover:bg-slate-700 text-white px-6 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-[1.02] shadow-lg"
        >
          {{ isEditing ? "Update Information" : "Add Librarian" }}
        </button>
        
        <button 
          @click="$emit('cancelEdit')" 
          type="button" 
          class="w-full mt-3 px-6 py-3 border border-slate-300 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition-all duration-300"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['submitForm', 'cancelEdit'])
const props = defineProps({
  formData: Object,
  isEditing: Boolean,
})

const localForm = ref({ 
  name: '',
  email: '',
  password: '',
  age: '',
  department: '',
  phone: '',
  access_level: 'Staff',
  ...props.formData 
})
const errors = ref({})
const successMessage = ref('')

watch(() => props.formData, (newVal) => {
  localForm.value = { 
    name: '',
    email: '',
    password: '',
    age: '',
    department: '',
    phone: '',
    access_level: 'Staff',
    ...newVal 
  }
  errors.value = {}
  successMessage.value = ''
}, { deep: true })

function validate() {
  errors.value = {}
  if (!localForm.value.name) errors.value.name = 'Full name is required.'
  if (!localForm.value.age || localForm.value.age <= 0) errors.value.age = 'Valid age is required.'
  if (!localForm.value.email || !/\S+@\S+\.\S+/.test(localForm.value.email))
    errors.value.email = 'Valid email address is required.'
  if (!props.isEditing && !localForm.value.password)
    errors.value.password = 'Password is required when adding new librarian.'

  return Object.keys(errors.value).length === 0
}

function submitForm() {
  if (!validate()) return

  emit('submitForm', localForm.value)
  successMessage.value = props.isEditing
    ? 'Librarian information updated successfully!'
    : 'New librarian added successfully!'

  // Clear success message after 3 seconds
  setTimeout(() => {
    successMessage.value = ''
  }, 3000)
}
</script>
