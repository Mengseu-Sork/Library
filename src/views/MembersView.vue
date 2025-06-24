<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4 text-blue-700">📚 Member Management</h1>

    <!-- Add Member Button -->
    <button
      @click="openAddForm"
      class="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      ➕ Add Member
    </button>

    <!-- Show Member Form inside modal -->
    <Modal v-if="showForm" @close="cancelEdit">
      <MemberForm
        :formData="form"
        :isEditing="isEditing"
        @submitForm="saveMember"
        @cancelEdit="cancelEdit"
      />
    </Modal>

    <!-- Members Table -->
    <MemberTable
      :members="members"
      @editMember="editMember"
      @deleteMember="removeMember"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MemberForm from "../components/member/Form.vue";
import MemberTable from "../components/member/Table.vue";
import {
  fetchMembers,
  createMember,
  updateMember,
  deleteMember
} from "../servers/memberService";

// Reactive State
const members = ref([]);
const form = ref({ name: "", age: "", email: "", password: "" });
const isEditing = ref(false);
const editId = ref(null);
const showForm = ref(false); // Control modal visibility

// Fetch Members
const getMembers = async () => {
  try {
    const response = await fetchMembers();
    members.value = response.data;
  } catch (error) {
    console.error("Error fetching members:", error);
  }
};

// Open Form for New Member
const openAddForm = () => {
  resetForm();
  showForm.value = true;
};

// Add or Update Member
const saveMember = async (data) => {
  try {
    if (isEditing.value) {
      await updateMember(editId.value, data);
    } else {
      await createMember(data);
    }
    resetForm();
    showForm.value = false; // Close modal after save
    getMembers();
  } catch (error) {
    console.error("Error saving member:", error);
  }
};

// Edit Member
const editMember = (member) => {
  form.value = { ...member };
  editId.value = member.id;
  isEditing.value = true;
  showForm.value = true; // Open modal in edit mode
};

// Delete Member
const removeMember = async (id) => {
  if (confirm("Are you sure you want to delete this member?")) {
    try {
      await deleteMember(id);
      getMembers();
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  }
};

// Cancel Form (used on cancel or modal close)
const cancelEdit = () => {
  resetForm();
  showForm.value = false;
};

// Reset Form Data
const resetForm = () => {
  form.value = { name: "", age: "", email: "", password: "" };
  isEditing.value = false;
  editId.value = null;
};

// Load members on component mount
onMounted(getMembers);
</script>
