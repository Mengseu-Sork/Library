<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-slate-800 flex items-center">
          <span class="text-4xl mr-3">👥</span>
          Member Management
        </h1>
        <p class="text-slate-600 mt-2">Manage your library members and their information</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg hover:shadow-xl transition-shadow">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-slate-600 rounded-xl flex items-center justify-center text-white text-xl">
            👥
          </div>
          <div class="ml-4">
            <p class="text-sm text-slate-600">Total Members</p>
            <p class="text-2xl font-bold text-slate-800">{{ members.length }}</p>
          </div>
        </div>
      </div>
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg hover:shadow-xl transition-shadow">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white text-xl">
            ✅
          </div>
          <div class="ml-4">
            <p class="text-sm text-slate-600">Active</p>
            <p class="text-2xl font-bold text-slate-800">{{ members.length }}</p>
          </div>
        </div>
      </div>
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg hover:shadow-xl transition-shadow">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white text-xl">
            📚
          </div>
          <div class="ml-4">
            <p class="text-sm text-slate-600">Books Borrowed</p>
            <p class="text-2xl font-bold text-slate-800">24</p>
          </div>
        </div>
      </div>
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg hover:shadow-xl transition-shadow">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white text-xl">
            ⏰
          </div>
          <div class="ml-4">
            <p class="text-sm text-slate-600">Overdue</p>
            <p class="text-2xl font-bold text-slate-800">3</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Member Form -->
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
      @create="openAddForm"
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
} from "../api/memberService";

// Reactive State
const members = ref([]);
const form = ref({ name: "", age: "", email: "", password: "" });
const isEditing = ref(false);
const editId = ref(null);
const showForm = ref(false);

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
      const idx = members.value.findIndex(m => m.id === editId.value)
      if (idx !== -1) members.value[idx] = { ...data, id: editId.value }
    } else {
      const res = await createMember(data);
      members.value.push(res.data);
    }
    resetForm();
    showForm.value = false;
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
  showForm.value = true;
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

// Cancel Form
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
