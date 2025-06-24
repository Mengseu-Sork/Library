<template>
  <div class="bg-white p-4 rounded shadow">
    <h2 class="text-xl font-bold mb-2">Categories</h2>
    <table class="w-full table-auto border-collapse">
      <thead>
        <tr class="bg-gray-100">
          <th class="text-left p-2 border">#</th>
          <th class="text-left p-2 border">Name</th>
          <th class="text-left p-2 border">Description</th>
          <th class="text-left p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, index) in categories" :key="category.id">
          <td class="p-2 border">{{ index + 1 }}</td>
          <td class="p-2 border">{{ category.name }}</td>
          <td class="p-2 border">{{ category.description }}</td>
          <td class="p-2 border space-x-2">
            <Button
              @click="$emit('edit', category)"
              class="hover:underline"
              aria-label="Edit category"
              label="Edit"
            />
              

            <Button
              @click="$emit('delete', category.id)"
              class="text-red-600 hover:underline"
              aria-label="Delete category"
              label="Delete"
              color="red"
            />
              
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  categories: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])
</script>
