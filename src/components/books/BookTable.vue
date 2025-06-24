<template>
  <table class="w-full border-collapse border border-gray-300">
    <thead class="bg-gray-200">
      <tr>
        <th class="border border-gray-300 p-2">Title</th>
        <th class="border border-gray-300 p-2">Author</th>
        <th class="border border-gray-300 p-2">Year</th>
        <th class="border border-gray-300 p-2">Category</th>
        <th class="border border-gray-300 p-2">Borrowed by</th>
        <th class="border border-gray-300 p-2">Librarian</th>
        <th class="border border-gray-300 p-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="book in books" :key="book.id" class="hover:bg-gray-100">
        <td class="border border-gray-300 p-2">{{ book.title }}</td>
        <td class="border border-gray-300 p-2">{{ book.author }}</td>
        <td class="border border-gray-300 p-2">{{ book.year }}</td>
        <td class="border border-gray-300 p-2">{{ book.category?.name || 'N/A' }}</td>
        <td class="border border-gray-300 p-2">{{ book.member?.name || 'None' }}</td>
        <td class="border border-gray-300 p-2">{{ book.librarian?.name || 'None' }}</td>
        <td class="border border-gray-300 p-2 flex gap-2 justify-center">
          <button
            @click="$emit('editBook', book)"
            class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            @click="$emit('deleteBook', book.id)"
            class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  books: Array,
});
defineEmits(["editBook", "deleteBook"]);
</script>
