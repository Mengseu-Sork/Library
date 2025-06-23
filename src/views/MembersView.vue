<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4 text-blue-700">📚 Member Management</h1>

    <!-- Member Form -->
    <MemberForm
      :formData="form"
      :isEditing="isEditing"
      @submitForm="saveMember"
      @cancelEdit="cancelEdit"
    />

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
import { fetchMembers, createMember, updateMember, deleteMember } from "../servers/memberService";

// Reactive State
const members = ref([]);
const form = ref({ name: "", age: "", email: "", password: "" });
const isEditing = ref(false);
const editId = ref(null);

// Fetch Members
const getMembers = async () => {
  try {
    const response = await fetchMembers();
    members.value = response.data;
  } catch (error) {
    console.error("Error fetching members:", error);
  }
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
    getMembers();
  } catch (error) {
    console.error("Error saving member:", error);
  }
};

// Edit Member
const editMember = (member) => {
  form.value = { name: member.name, age: member.age, email: member.email, password: member.password };
  editId.value = member.id;
  isEditing.value = true;
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

// Cancel Edit
const cancelEdit = () => {
  resetForm();
};

// Reset Form
const resetForm = () => {
  form.value = { name: "", age: "", email: "", password: "" };
  isEditing.value = false;
  editId.value = null;
};

// Fetch members on component mount
onMounted(getMembers);
</script>
