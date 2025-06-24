<template>
  <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4">
    <!-- Form Header -->
    <div class="bg-gradient-to-r from-slate-800 to-slate-700 text-white p-6 rounded-t-2xl">
      <h2 class="text-2xl font-bold flex items-center">
        <span class="text-3xl mr-3">{{ isEditing ? '✏️' : '👥' }}</span>
        {{ isEditing ? 'Change Member Information Here' : 'Add New Member Information' }}
      </h2>
      <p class="text-slate-300 mt-2">{{ isEditing ? 'Update member details below' : 'Fill in the details for the new library member' }}</p>
    </div>

    <!-- Form Body -->
    <form @submit.prevent="onSubmit" class="p-8 space-y-6">
      <!-- Row 1: Full Name and Email Address -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-2">
          <label class="block text-sm font-medium text-slate-700">
            Full Name*
          </label>
          <input 
            v-model="form.name" 
            type="text" 
            placeholder="Enter full name" 
            class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white"
            required 
          />
        </div>
  <div class="space-y-2">
          <label class="block text-sm font-medium text-slate-700">
            Age*
          </label>
          <input 
            v-model.number="form.age" 
            type="number" 
            placeholder="Enter age" 
            class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white"
            required 
          />
        </div>

         
        
      </div>

      <!-- Row 2: Phone Number and Age -->
      

      <!-- Row 3: Address (Full Width) -->
     <div class="space-y-2">
          <label class="block text-sm font-medium text-slate-700">
            Email Address*
          </label>
          <input 
            v-model="form.email" 
            type="email" 
            placeholder="Enter email address" 
            class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white"
            required 
          />
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-slate-700">
            Password*
          </label>
          <input 
            v-model="form.password" 
            type="password" 
            placeholder="Enter secure password" 
            class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white"
            required 
          />
        </div>
      <div class="pt-6">
        <button 
          type="submit" 
          class="w-full bg-slate-600 hover:bg-slate-700 text-white px-6 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-[1.02] shadow-lg"
        >
          {{ isEditing ? "Update Information" : "Add Member" }}
        </button>
        
        <button 
          @click="cancelEdit" 
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
import { ref, watch } from "vue";

// Props for form data and actions
const props = defineProps({
  formData: Object,
  isEditing: Boolean,
});

const emits = defineEmits(["submitForm", "cancelEdit"]);

// Local reactive state for the form
const form = ref({ 
  name: "", 
  age: "", 
  email: "", 
  password: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  membershipType: "Standard",
  emergencyContact: "",
  idNumber: ""
});

// Watch the formData prop and sync it with local form state
watch(
  () => props.formData,
  (newVal) => {
    form.value = { 
      name: "", 
      age: "", 
      email: "", 
      password: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      membershipType: "Standard",
      emergencyContact: "",
      idNumber: "",
      ...newVal 
    };
  },
  { immediate: true }
);

// Handle form submission
const onSubmit = () => {
  emits("submitForm", form.value);
};

// Cancel edit action
const cancelEdit = () => {
  emits("cancelEdit");
};
</script>
