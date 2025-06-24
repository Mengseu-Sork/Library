<template>
  <aside class="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white w-72 h-full fixed top-0 left-0 flex flex-col border-r border-slate-700/50 shadow-2xl">
    <!-- Logo Section -->
    <div class=" flex flex-col items-center border-b border-slate-700/50 bg-slate-800/50">
      <div class="relative m-1.5">
        <div class="w-20 h-20 bg-gradient-to-br from-slate-600 to-slate-800 rounded-2xl flex items-center justify-center border-2 border-slate-600/50 shadow-xl overflow-hidden">
          <img src="../../assets/images/logo.jpg" alt="Library Logo" class="w-full h-full object-cover rounded-2xl" />
        </div>
        <div class="absolute -top-2 -right-2 w-6 h-6 bg-slate-400 rounded-full flex items-center justify-center shadow-lg">
          <span class="text-xs font-bold text-slate-900">✨</span>
        </div>
      </div>
     
    </div>

    <!-- Navigation -->
    <nav class="flex-grow p-4">
      <ul class="space-y-3">
        <li>
          <RouterLink
            to="/"
            class="group flex items-center p-3 rounded-xl transition-all duration-300 hover:bg-slate-700/50 hover:scale-[1.02] hover:shadow-lg border border-transparent hover:border-slate-600/50"
            active-class="bg-slate-700/70 border-slate-600/70 shadow-lg font-bold"
            exact-active-class="bg-slate-600/60 border-slate-500/80 shadow-xl font-bold text-white"
          >
            <span class="text-2xl mr-3 group-hover:scale-110 transition-transform opacity-80 group-hover:opacity-100">🏠</span>
            <span class="font-semibold group-hover:text-white text-slate-200">Dashboard</span>
            <div class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
              <div class="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
            </div>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/members"
            class="group flex items-center p-3 rounded-xl transition-all duration-300 hover:bg-slate-700/50 hover:scale-[1.02] hover:shadow-lg border border-transparent hover:border-slate-600/50"
            active-class="bg-slate-700/70 border-slate-600/70 shadow-lg font-bold"
            exact-active-class="bg-slate-600/60 border-slate-500/80 shadow-xl font-bold text-white"
          >
            <span class="text-2xl mr-3 group-hover:scale-110 transition-transform opacity-80 group-hover:opacity-100">👥</span>
            <span class="font-semibold group-hover:text-white text-slate-200">Members</span>
            <div class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
              <div class="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
            </div>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/books"
            class="group flex items-center p-3 rounded-xl transition-all duration-300 hover:bg-slate-700/50 hover:scale-[1.02] hover:shadow-lg border border-transparent hover:border-slate-600/50"
            active-class="bg-slate-700/70 border-slate-600/70 shadow-lg font-bold"
            exact-active-class="bg-slate-600/60 border-slate-500/80 shadow-xl font-bold text-white"
          >
            <span class="text-2xl mr-3 group-hover:scale-110 transition-transform opacity-80 group-hover:opacity-100">📚</span>
            <span class="font-semibold group-hover:text-white text-slate-200">Books</span>
            <div class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
              <div class="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
            </div>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/librarians"
            class="group flex items-center p-3 rounded-xl transition-all duration-300 hover:bg-slate-700/50 hover:scale-[1.02] hover:shadow-lg border border-transparent hover:border-slate-600/50"
            active-class="bg-slate-700/70 border-slate-600/70 shadow-lg font-bold"
            exact-active-class="bg-slate-600/60 border-slate-500/80 shadow-xl font-bold text-white"
          >
            <span class="text-2xl mr-3 group-hover:scale-110 transition-transform opacity-80 group-hover:opacity-100">👨‍💼</span>
            <span class="font-semibold group-hover:text-white text-slate-200">Librarians</span>
            <div class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
              <div class="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
            </div>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/borrows"
            class="group flex items-center p-3 rounded-xl transition-all duration-300 hover:bg-slate-700/50 hover:scale-[1.02] hover:shadow-lg border border-transparent hover:border-slate-600/50"
            active-class="bg-slate-700/70 border-slate-600/70 shadow-lg font-bold"
            exact-active-class="bg-slate-600/60 border-slate-500/80 shadow-xl font-bold text-white"
          >
            <span class="text-2xl mr-3 group-hover:scale-110 transition-transform opacity-80 group-hover:opacity-100">📋</span>
            <span class="font-semibold group-hover:text-white text-slate-200">Borrows</span>
            <div class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
              <div class="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
            </div>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/categories"
            class="group flex items-center p-3 rounded-xl transition-all duration-300 hover:bg-slate-700/50 hover:scale-[1.02] hover:shadow-lg border border-transparent hover:border-slate-600/50"
            active-class="bg-slate-700/70 border-slate-600/70 shadow-lg font-bold"
            exact-active-class="bg-slate-600/60 border-slate-500/80 shadow-xl font-bold text-white"
          >
            <span class="text-2xl mr-3 group-hover:scale-110 transition-transform opacity-80 group-hover:opacity-100">🏷️</span>
            <span class="font-semibold group-hover:text-white text-slate-200">Categories</span>
            <div class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
              <div class="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
            </div>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <!-- Footer/Status -->
    <div class="p-4 border-t border-slate-700/50 bg-slate-800/30">
      <div class="flex items-center justify-between text-sm">
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span class="text-slate-300 font-medium">System Online</span>
        </div>
        <div class="text-slate-400">
          <span>v2.0</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
