<template>
  <div class="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <Sidebar />

    <div class="flex-grow ml-72">
      <Navbar />
      <main class="p-6 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 min-h-[calc(100vh-80px)] overflow-y-auto">
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
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
}

* {
  box-sizing: border-box;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(148, 163, 184, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #64748b, #475569);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #475569, #334155);
}
</style>
