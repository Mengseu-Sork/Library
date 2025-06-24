<!-- BorrowTable.vue -->
<template>
  <table class="w-full border border-gray-300">
    <thead>
      <tr class="bg-gray-100">
        <th class="p-2">Member</th>
        <th class="p-2">Librarian</th>
        <th class="p-2">Book</th>
        <th class="p-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="borrow in borrows" :key="borrow.id">
        <td class="p-2">{{ borrow.member?.name }}</td>
        <td class="p-2">{{ borrow.librarian?.name }}</td>
        <td class="p-2">{{ borrow.book?.title }}</td>
        <td class="p-2">
          <Button class="text-blue-600 mr-2" @click="$emit('editBorrow', borrow)" label="✏️"/>
          <Button class="text-red-600" @click="$emit('deleteBorrow', borrow.id)" label="🗑️"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps(['borrows'])
defineEmits(['editBorrow', 'deleteBorrow'])
</script>
