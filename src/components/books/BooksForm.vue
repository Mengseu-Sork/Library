<!-- BooksForm.vue -->
<template>
  <form @submit.prevent="onSubmit" class="space-y-3">
    <input v-model="form.title" type="text" placeholder="Title" class="border p-2 w-full rounded" required />
    <input v-model="form.author" type="text" placeholder="Author" class="border p-2 w-full rounded" required />
    <input v-model="form.year" type="number" placeholder="Year" class="border p-2 w-full rounded" required />

    <select v-model="form.category_id" class="border p-2 w-full rounded" required>
      <option value="" disabled>Select Category</option>
      <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
    </select>

    <select v-model="form.member_id" class="border p-2 w-full rounded">
      <option value="">Select Member</option>
      <option v-for="mem in members" :key="mem.id" :value="mem.id">{{ mem.name }}</option>
    </select>

    <select v-model="form.librarian_id" class="border p-2 w-full rounded">
      <option value="">Select Librarian</option>
      <option v-for="lib in librarians" :key="lib.id" :value="lib.id">{{ lib.name }}</option>
    </select>

    <div class="flex gap-4">
      <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded">
        {{ isEditing ? 'Update Book' : 'Add Book' }}
      </button>
      <button v-if="isEditing" type="button" @click="cancelEdit" class="bg-red-500 text-white px-4 py-2 rounded">
        Cancel
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { fetchAllData } from "../../servers/relatedServices";

const props = defineProps({
  formData: Object,
  isEditing: Boolean,
});

const emits = defineEmits(["submitForm", "cancelEdit"]);

const form = ref({
  title: "",
  author: "",
  year: "",
  category_id: "",
  member_id: "",
  librarian_id: "",
});

const categories = ref([]);
const members = ref([]);
const librarians = ref([]);

onMounted(async () => {
  try {
    const res = await fetchAllData();
    categories.value = res.data.categories || [];
    members.value = res.data.members || [];
    librarians.value = res.data.librarians || [];
  } catch (err) {
    console.error("Failed loading related data:", err);
  }
});

watch(
  () => props.formData,
  (newVal) => {
    form.value = { ...newVal };
  },
  { immediate: true }
);

const onSubmit = () => {
  emits("submitForm", form.value);
};

const cancelEdit = () => {
  emits("cancelEdit");
};
</script>
