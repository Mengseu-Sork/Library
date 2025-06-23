<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4 text-blue-700">📚 Member Management</h1>

    <form @submit.prevent="isEditing ? updateMember() : addMember()" class="mb-6 space-y-3">
    <input v-model="form.name" type="text" placeholder="Name" class="border p-2 w-full rounded" required />
    <input v-model="form.age" type="number" placeholder="Age" class="border p-2 w-full rounded" required />
    <input v-model="form.email" type="email" placeholder="Email" class="border p-2 w-full rounded" required />
    <input v-model="form.password" type="password" placeholder="Password" class="border p-2 w-full rounded" required />
    <div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        {{ isEditing ? 'Update' : 'Add' }} Member
        </button>
        <button v-if="isEditing" @click="cancelEdit" type="button" class="text-red-500 ml-3">
        Cancel
        </button>
    </div>
    </form>


    <!-- Members Table -->
    <table class="w-full border border-gray-300">
      <thead class="bg-gray-100">
        <tr>
          <th class="border p-2">#</th>
          <th class="border p-2 text-left">Name</th>
          <th class="border p-2 text-left">Age</th>
          <th class="border p-2 text-left">Email</th>
          <th class="border p-2 text-left">Password</th>
          <th class="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(member, index) in members" :key="member.id">
          <td class="border p-2 text-center">{{ index + 1 }}</td>
          <td class="border p-2">{{ member.name }}</td>
          <td class="border p-2">{{ member.age }}</td>
          <td class="border p-2">{{ member.email }}</td>
          <td class="border p-2">{{ member.password }}</td>
          <td class="border p-2 text-center">
            <button @click="editMember(member)" class="text-blue-500 hover:underline">Edit</button>
            <button @click="deleteMember(member.id)" class="text-red-500 hover:underline ml-2">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const members = ref([])
const form = ref({ name: '', email: '' })
const isEditing = ref(false)
const editId = ref(null)

const fetchMembers = async () => {
  const res = await axios.get('http://127.0.0.1:8000/api/v1/members')
  members.value = res.data
}

const addMember = async () => {
  await axios.post('http://127.0.0.1:8000/api/v1/members', form.value)
  resetForm()
  fetchMembers()
}

const editMember = (member) => {
  form.value = { name: member.name, age: member.age, email: member.email, password: member.password }
  editId.value = member.id
  isEditing.value = true
}

const updateMember = async () => {
  await axios.put(`http://127.0.0.1:8000/api/v1/members/${editId.value}`, form.value)
  resetForm()
  fetchMembers()
}

const deleteMember = async (id) => {
  if (confirm('Are you sure you want to delete this member?')) {
    await axios.delete(`http://127.0.0.1:8000/api/v1/members/${id}`)
    fetchMembers()
  }
}

const cancelEdit = () => {
  resetForm()
}

const resetForm = () => {
  form.value = { name: '', age: '', email: '', password: '' }
  isEditing.value = false
  editId.value = null
}

onMounted(fetchMembers)
</script>
