<template>
  <aside class="bg-gray-800 text-white w-64 h-full fixed top-0 left-0 flex flex-col">
    <div class="p-4 text-lg font-bold">Menu</div>
    <nav class="flex-grow">
      <ul class="space-y-2 p-4">
        <li>
          <RouterLink
            to="/"
            class="block p-2 rounded hover:bg-gray-700"
            active-class="bg-gray-700 font-bold"
            exact-active-class="bg-blue-700 font-bold"
          >
            Dashboard
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/members"
            class="block p-2 rounded hover:bg-gray-700"
            active-class="bg-gray-700 font-bold"
            exact-active-class="bg-blue-700 font-bold"
          >
            Members
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/books"
            class="block p-2 rounded hover:bg-gray-700"
            active-class="bg-gray-700 font-bold"
            exact-active-class="bg-blue-700 font-bold"
          >
            Books
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/librarians"
            class="block p-2 rounded hover:bg-gray-700"
            active-class="bg-gray-700 font-bold"
            exact-active-class="bg-blue-700 font-bold"
          >
            Librarians
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/borrows"
            class="block p-2 rounded hover:bg-gray-700"
            active-class="bg-gray-700 font-bold"
            exact-active-class="bg-blue-700 font-bold"
          >
            Borrows
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/categories"
            class="block p-2 rounded hover:bg-gray-700"
            active-class="bg-gray-700 font-bold"
            exact-active-class="bg-blue-700 font-bold"
          >
            Categories
          </RouterLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
