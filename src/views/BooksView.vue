<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4 text-green-700">📘 Book Management</h1>

    <!-- Add Book Button -->
    <button
      @click="openAddForm"
      class="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      ➕ Add Book
    </button>

    <!-- Book Form in Modal -->
    <Modal v-if="showForm" @close="cancelEdit">
      <BookForm
        :formData="form"
        :isEditing="isEditing"
        @submitForm="saveBook"
        @cancelEdit="cancelEdit"
      />
    </Modal>

    <!-- Book Table -->
    <BookTable
      :books="books"
      @editBook="editBook"
      @deleteBook="deleteBook"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import BookForm from "@/components/books/BooksForm.vue";
import BookTable from "@/components/books/BookTable.vue";
import {
  fetchBooks,
  createBooks,
  updateBooks,
  deleteBooks
} from "../servers/booksServices";

// State
const books = ref([]);
const form = ref({ title: "", author: "", year: "" });
const isEditing = ref(false);
const editId = ref(null);
const showForm = ref(false);

// Load books when mounted
onMounted(async () => {
  await loadBooks();
});

const loadBooks = async () => {
  try {
    const response = await fetchBooks();
    books.value = response.data;
  } catch (error) {
    console.error("Failed to fetch books:", error);
  }
};

// Add New Book
const openAddForm = () => {
  resetForm();
  showForm.value = true;
};

// Save Book (Add or Edit)
const saveBook = async (data) => {
  try {
    if (isEditing.value) {
      await updateBooks(editId.value, data);
    } else {
      await createBooks(data);
    }
    await loadBooks();  // Refresh the list
    cancelEdit();
  } catch (error) {
    console.error("Failed to save book:", error);
  }
};

// Edit Book
const editBook = (book) => {
  form.value = { title: book.title, author: book.author, year: book.year };
  editId.value = book.id;
  isEditing.value = true;
  showForm.value = true;
};

// Delete Book
const deleteBook = async (id) => {
  if (confirm("Are you sure you want to delete this book?")) {
    try {
      await deleteBooks(id);
      await loadBooks();
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  }
};

// Cancel Edit/Add
const cancelEdit = () => {
  resetForm();
  showForm.value = false;
};

// Reset Form
const resetForm = () => {
  form.value = { title: "", author: "", year: "" };
  isEditing.value = false;
  editId.value = null;
};
</script>
