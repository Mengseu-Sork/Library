<template>
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
        <td class="border p-2 text-center space-x-2">
          <!-- Edit Icon Button -->
          <button
            @click="$emit('editMember', member)"
            class="text-blue-500 hover:text-blue-700"
            aria-label="Edit member"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-6 6-3 3H6v-3l3-3z" />
            </svg>
          </button>

          <!-- Delete Icon Button -->
          <button
            @click="$emit('deleteMember', member.id)"
            class="text-red-500 hover:text-red-700"
            aria-label="Delete member"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps({
  members: Array,
});

const emits = defineEmits(["editMember", "deleteMember"]);
</script>
