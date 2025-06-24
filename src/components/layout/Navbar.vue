<template>
  <nav class="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white p-4 shadow-xl flex justify-between items-center border-b border-slate-600/50">
    <!-- Left Side - Title -->
    <div class="flex items-center space-x-4">
      <div class="text-3xl font-bold text-white">
        Library Management
      </div>
      <div class="hidden md:flex items-center space-x-2">
        <div class="px-3 py-1 bg-slate-600/50 backdrop-blur-sm rounded-full text-sm font-medium border border-slate-500/50 shadow-lg">
          <span class="flex items-center space-x-1">
            <span>🚀</span>
            <span>Pro</span>
          </span>
        </div>
        <div class="px-3 py-1 bg-green-500/20 backdrop-blur-sm rounded-full text-sm font-medium border border-green-400/30 shadow-lg">
          <span class="flex items-center space-x-1">
            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Live</span>
          </span>
        </div>
      </div>
    </div>

    <!-- Right Side - User Info -->
    <div class="flex items-center space-x-4">
      <!-- Notifications -->
      <div class="relative">
        <button class="p-2 bg-slate-600/50 backdrop-blur-sm rounded-xl border border-slate-500/50 hover:bg-slate-600/70 transition-all duration-300 hover:scale-105 shadow-lg">
          <span class="text-xl">🔔</span>
        </button>
        <div class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
          3
        </div>
      </div>

      <!-- Settings -->
      <button class="p-2 bg-slate-600/50 backdrop-blur-sm rounded-xl border border-slate-500/50 hover:bg-slate-600/70 transition-all duration-300 hover:scale-105 shadow-lg">
        <span class="text-xl">⚙️</span>
      </button>

      <!-- User Profile -->
      <div class="flex items-center space-x-3 bg-slate-600/50 backdrop-blur-sm rounded-2xl px-4 py-2 border border-slate-500/50 shadow-lg hover:bg-slate-600/70 transition-all duration-300 cursor-pointer group">
        <div class="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <span class="text-lg font-bold text-white">A</span>
        </div>
        <div class="hidden md:block">
          <div class="font-bold text-white group-hover:text-slate-200 transition-colors">Welcome, Admin</div>
          <div class="text-xs text-slate-400">Super Administrator</div>
        </div>
        <span class="text-slate-400 group-hover:text-white transition-colors">▼</span>
      </div>
    </div>
  </nav>
</template>

<script setup></script>
