<template>
  <form @submit.prevent="onSubmit" class="mb-6 space-y-3">
    <input v-model="form.name" type="text" placeholder="Name" class="border p-2 w-full rounded" required />
    <input v-model="form.age" type="number" placeholder="Age" class="border p-2 w-full rounded" required />
    <input v-model="form.email" type="email" placeholder="Email" class="border p-2 w-full rounded" required />
    <input v-model="form.password" type="password" placeholder="Password" class="border p-2 w-full rounded" required />
    <div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        {{ isEditing ? "Update" : "Add" }} Member
      </button>
      <button v-if="isEditing" @click="cancelEdit" type="button" class="text-red-500 ml-3">
        Cancel
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from "vue";
import { toRefs } from "vue";

// Props for form data and actions
const props = defineProps({
  formData: Object,
  isEditing: Boolean,
});

const emits = defineEmits(["submitForm", "cancelEdit"]);

// Local reactive state for the form
const form = ref({ name: "", age: "", email: "", password: "" });

// Watch the formData prop and sync it with local form state
watch(
  () => props.formData,
  (newVal) => {
    form.value = { ...newVal };
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
