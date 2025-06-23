<template>
  <div class="flex min-h-screen">
    <Sidebar />

    <div class="flex-grow ml-64">
      <Navbar />
      <main class="p-6 bg-gray-100 min-h-screen">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "./components/layout/Sidebar.vue";
import Navbar from "./components/layout/Navbar.vue";
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>
