<template>
  <nav class="bg-blue-600 text-white p-4 shadow-md flex justify-between ">
    <div class="flex gap-4">

    </div>
    <div class="flex gap-12 mr-4">
      <RouterLink to="/" class="hover:underline">Members</RouterLink>
      <RouterLink to="/books" class="hover:underline">Books</RouterLink>
      <RouterLink to="/librarians" class="hover:underline">Librarians</RouterLink>
      <RouterLink to="/borrows" class="hover:underline">Borrows</RouterLink>
      <RouterLink to="/categories" class="hover:underline">Categories</RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>