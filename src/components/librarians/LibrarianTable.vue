<template>
  <div class="overflow-x-auto shadow-lg rounded-lg">
    <table class="min-w-full bg-white border border-gray-300">
      <thead class="bg-blue-600 text-white select-none">
        <tr>
          <th class="p-3 text-center uppercase tracking-wide">#</th>
          <th class="p-3 text-left uppercase tracking-wide">Name</th>
          <th class="p-3 text-left uppercase tracking-wide">Age</th>
          <th class="p-3 text-left uppercase tracking-wide">Email</th>
          <th class="p-3 text-left uppercase tracking-wide">Password</th>
          <th class="w-56 p-3 text-center uppercase tracking-wide">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(librarian, index) in librarians"
          :key="librarian.id"
          class="border-b border-gray-200 hover:bg-blue-50 transition-colors duration-200"
        >
          <td class="p-3 text-center text-gray-700 font-medium">{{ index + 1 }}</td>
          <td class="p-3 text-gray-800">{{ librarian.name }}</td>
          <td class="p-3 text-gray-800">{{ librarian.age }}</td>
          <td class="p-3 text-gray-800 break-all">{{ librarian.email }}</td>
          <td class="p-3 text-gray-800 break-all">{{ librarian.password }}</td>
          <td class="p-3 text-center space-x-3">
            <Button
              @click="$emit('editLibrarian', librarian)"
              aria-label="Edit librarian"
              label="Edit"
            />
            
            <Button
              @click="$emit('deleteLibrarian', librarian.id)"
              aria-label="Delete librarian"
              label="Delete"
              color="red"
            />
          </td>
        </tr>
        <tr v-if="librarians.length === 0">
          <td colspan="6" class="p-4 text-center text-gray-500 italic">
            No librarians found.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  librarians: {
    type: Array,
    required: true,
  },
})
</script>
