<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4 text-blue-700">📚 Borrow Management</h1>

    <!-- Add Borrow Button -->
    <button
      @click="openAddForm"
      class="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      ➕ Borrow Book
    </button>

    <!-- Borrow Form Modal -->
    <Modal v-if="showForm" @close="cancelEdit">
      <BorrowForm
        :formData="form"
        :members="members"
        :books="books"
        :librarians="librarians"
        :isEditing="isEditing"
        @submitForm="saveBorrow"
        @cancelEdit="cancelEdit"
        />
    </Modal>

    <!-- Borrow Table -->
    <BorrowTable
      :borrows="borrows"
      @editBorrow="editBorrow"
      @deleteBorrow="deleteBorrowById"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/plugins/axios";
import BorrowForm from "@/components/borrows/BorrowForm.vue";
import BorrowTable from "@/components/borrows/BorrowTable.vue";
import {
  fetchBorrows,
  createBorrow,
  updateBorrow,
  deleteBorrow
} from "@/api/borrowServices";

const borrows = ref([]);
const members = ref([]);
const books = ref([]);
const librarians = ref([]);

const form = ref({ member_id: "", librarian_id: "", book_id: "" });
const isEditing = ref(false);
const editId = ref(null);
const showForm = ref(false);

// Load all data
const loadAll = async () => {
  const [borrowRes, memberRes, bookRes, librarianRes] = await Promise.all([
    fetchBorrows(),
    axios.get("/members"),
    axios.get("/books"),
    axios.get("/librarians")
  ]);
  borrows.value = borrowRes.data;
  members.value = memberRes.data;
  books.value = bookRes.data;
  librarians.value = librarianRes.data;
};

onMounted(loadAll);

// Save borrow
const saveBorrow = async (data) => {
  try {
    if (isEditing.value) {
      await updateBorrow(editId.value, data);
    } else {
      await createBorrow(data);
    }
    await loadAll();
    cancelEdit();
  } catch (err) {
    console.error("❌ Failed to save borrow:", err);
  }
};

// Delete borrow
const deleteBorrowById = async (id) => {
  if (confirm("Are you sure you want to delete this borrow record?")) {
    try {
      await deleteBorrow(id);
      await loadAll();
    } catch (err) {
      console.error("❌ Failed to delete borrow:", err);
    }
  }
};

// Edit borrow
const editBorrow = (borrow) => {
  form.value = {
    member_id: borrow.member?.id || borrow.member_id,
    librarian_id: borrow.librarian?.id || borrow.librarian_id,
    book_id: borrow.book?.id || borrow.book_id,
  };
  editId.value = borrow.id;
  isEditing.value = true;
  showForm.value = true;
};

const openAddForm = () => {
  resetForm();
  showForm.value = true;
};

const cancelEdit = () => {
  resetForm();
  showForm.value = false;
};

const resetForm = () => {
  form.value = { member_id: "", librarian_id: "", book_id: "" };
  isEditing.value = false;
  editId.value = null;
};
</script>
