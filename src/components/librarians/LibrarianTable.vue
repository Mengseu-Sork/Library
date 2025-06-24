<template>
      <div class="bg-slate-800 rounded-xl border border-slate-600 overflow-hidden shadow-2xl">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-slate-750 border-b border-slate-600">
                <th class="px-6 py-4 text-center">
                  <div class="flex items-center justify-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
                    INDEX
                  </div>
                </th>
                <th class="px-6 py-4 text-left">
                  <div class="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
                    LIBRARIAN
                  </div>
                </th>
                <th class="px-6 py-4 text-left">
                  <div class="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
                    AGE_DATA
                  </div>
                </th>
                <th class="px-6 py-4 text-left">
                  <div class="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
                    CONTACT_INFO
                  </div>
                </th>
                <th class="px-6 py-4 text-left">
                  <div class="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
                    AUTH
                  </div>
                </th>
                <th class="px-6 py-4 text-center w-32">
                  <div class="flex items-center justify-center gap-2 text-orange-400 font-mono text-xs uppercase tracking-wider">
                    ACTIONS
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(librarian, index) in librarians" 
                :key="librarian.id"
                class="border-b border-slate-700 hover:bg-slate-750 transition-all duration-300 group"
              >
                <!-- Index Column -->
                <td class="px-6 py-4 text-center">
                  <div class="flex items-center justify-center gap-2">
                    <div class="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg border border-cyan-400 flex items-center justify-center">
                      <span class="text-white font-mono text-sm font-bold">{{ String(index + 1).padStart(2, '0') }}</span>
                    </div>
                    <div class="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                  </div>
                </td>

                <!-- Name Column -->
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-slate-700 border-2 border-emerald-400 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <span class="text-emerald-400 font-mono font-bold text-lg">{{ librarian.name.charAt(0).toUpperCase() }}</span>
                      <div class="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-transparent"></div>
                    </div>
                    <div>
                      <div class="text-white font-mono font-semibold text-lg">{{ librarian.name.toUpperCase() }}</div>
                      <div class="text-slate-400 font-mono text-xs flex items-center gap-2">
                        <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                        LIBRARIAN_{{ String(librarian.id).padStart(3, '0') }}
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Age Column -->
                <td class="px-6 py-4">
                  <div class="inline-flex items-center gap-2 px-4 py-2 bg-violet-900/50 border border-violet-400 rounded-lg backdrop-blur-sm">
                    <div class="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
                    <span class="text-violet-300 font-mono font-semibold">{{ librarian.age }}</span>
                    <span class="text-violet-400 font-mono text-xs">YRS</span>
                  </div>
                </td>

                <!-- Email Column -->
                <td class="px-6 py-4">
                  <div class="space-y-1">
                    <div class="text-amber-300 font-mono text-sm break-all">{{ librarian.email }}</div>
                    <div class="flex items-center gap-2">
                      <div class="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      <span class="text-slate-500 font-mono text-xs">VERIFIED_CONTACT</span>
                    </div>
                  </div>
                </td>

                <!-- Password Column -->
                <td class="px-6 py-4">
                  <div class="space-y-2">
                  
                    <div class="inline-flex items-center gap-2 px-3 py-1 bg-rose-900/50 border border-rose-400 rounded-full text-xs">
                      <div class="w-1.5 h-1.5 bg-rose-400 rounded-full animate-pulse"></div>
                      <span class="text-rose-300 font-mono">ENCRYPTED</span>
                    </div>
                  </div>
                </td>

                <!-- Actions Column - Icon Only -->
                <td class="px-6 py-4">
                  <div class="flex items-center justify-center gap-2">
                    <!-- Edit Icon Button -->
                    <button
                      @click="$emit('editLibrarian', librarian)"
                      class="group/btn w-10 h-10 bg-blue-600 border border-blue-500 rounded-lg hover:bg-blue-500 hover:border-blue-400 transition-all duration-200 flex items-center justify-center hover:shadow-lg hover:shadow-blue-500/25"
                      title="Edit Librarian"
                    >
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>

                    <!-- Delete Icon Button -->
                    <button
                      @click="$emit('deleteLibrarian', librarian.id)"
                      class="group/btn w-10 h-10 bg-red-600 border border-red-500 rounded-lg hover:bg-red-500 hover:border-red-400 transition-all duration-200 flex items-center justify-center hover:shadow-lg hover:shadow-red-500/25"
                      title="Delete Librarian"
                    >
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Empty State -->
              <tr v-if="librarians.length === 0">
                <td colspan="6" class="px-6 py-16 text-center">
                  <div class="flex flex-col items-center gap-6">
                    <div class="w-20 h-20 bg-slate-700 border-2 border-slate-600 rounded-xl flex items-center justify-center relative">
                      <span class="text-slate-400 text-3xl">📚</span>
                      <div class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <span class="text-white text-xs">!</span>
                      </div>
                    </div>
                    <div class="space-y-2">
                      <div class="text-slate-300 font-mono text-xl font-bold">NO_LIBRARIANS_FOUND</div>
                      <div class="text-slate-500 font-mono text-sm">DATABASE_EMPTY :: INITIALIZE_PERSONNEL_RECORDS</div>
                    </div>
                    <div class="flex items-center gap-2 px-4 py-2 bg-amber-900/30 border border-amber-400 rounded-lg">
                      <div class="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                      <span class="text-amber-300 font-mono text-xs">AWAITING_DATA_INPUT</span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- System Status Footer -->
        <div class="bg-slate-750 border-t border-slate-600 px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-6 text-xs font-mono text-slate-400">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>RECORDS: {{ librarians.length }}</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>ACTIVE_SESSIONS: 3</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-violet-400 rounded-full"></div>
                <span>MEMORY_USAGE: 1.8MB</span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span class="text-green-400 font-mono text-xs font-semibold">SYSTEM_READY</span>
            </div>
          </div>
        </div>
      </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  librarians: {
    type: Array,
    required: true,
    default: () => [
      { id: 1, name: "Alice Johnson", age: 34, email: "alice@library.com", password: "secure123" },
      { id: 2, name: "Bob Smith", age: 28, email: "bob@library.com", password: "password456" },
      { id: 3, name: "Carol Davis", age: 41, email: "carol@library.com", password: "mypass789" },
      { id: 4, name: "David Wilson", age: 36, email: "david@library.com", password: "secret321" }
    ]
  }
});

const emits = defineEmits(["editLibrarian", "deleteLibrarian"]);
</script>

<style scoped>
.bg-slate-750 {
  background-color: #334155;
}
</style>