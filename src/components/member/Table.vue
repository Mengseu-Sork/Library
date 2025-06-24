<template>
  <div class="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden shadow-2xl">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="bg-gray-750 border-b border-gray-600">
            <th class="px-6 py-4 text-left">
              <div class="flex items-center gap-2 text-green-400 font-mono text-xs uppercase tracking-wider">
                ID
              </div>
            </th>
            <th class="px-6 py-4 text-left">
              <div class="flex items-center gap-2 text-green-400 font-mono text-xs uppercase tracking-wider">
                NAME
              </div>
            </th>
            <th class="px-6 py-4 text-left">
              <div class="flex items-center gap-2 text-green-400 font-mono text-xs uppercase tracking-wider">
                AGE
              </div>
            </th>
            <th class="px-6 py-4 text-left">
              <div class="flex items-center gap-2 text-green-400 font-mono text-xs uppercase tracking-wider">
                EMAIL
              </div>
            </th>
            <th class="px-6 py-4 text-left">
              <div class="flex items-center gap-2 text-green-400 font-mono text-xs uppercase tracking-wider">
                PASSWORD
              </div>
            </th>
            <th class="px-6 py-4 text-center">
              <div
                class="flex items-center justify-center gap-2 text-green-400 font-mono text-xs uppercase tracking-wider">
                ACTIONS
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(member, index) in members" :key="member.id"
            class="border-b border-gray-700 hover:bg-gray-750 transition-all duration-200 group">
            <!-- ID Column -->
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div
                  class="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded border border-green-400 flex items-center justify-center">
                  <span class="text-white font-mono text-sm font-bold">{{ String(index + 1).padStart(2, '0') }}</span>
                </div>
                <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </td>

            <!-- Name Column -->
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gray-700 border border-blue-400 rounded flex items-center justify-center">
                  <span class="text-blue-400 font-mono font-bold">{{ member.name.charAt(0).toUpperCase() }}</span>
                </div>
                <div>
                  <div class="text-white font-mono font-semibold">{{ member.name.toUpperCase() }}</div>
                  <div class="text-gray-400 font-mono text-xs">USER_{{ member.id }}</div>
                </div>
              </div>
            </td>

            <!-- Age Column -->
            <td class="px-6 py-4">
              <div class="inline-flex items-center gap-2 px-3 py-1 bg-purple-900 border border-purple-400 rounded-full">
                <div class="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span class="text-purple-300 font-mono text-sm">{{ member.age }}Y</span>
              </div>
            </td>

            <!-- Email Column -->
            <td class="px-6 py-4">
              <div class="text-yellow-300 font-mono text-sm">{{ member.email }}</div>
              <div class="text-gray-500 font-mono text-xs">VERIFIED</div>
            </td>

            <!-- Password Column -->
            <td class="px-6 py-4">
              <div class="flex items-center gap-2">
                <div class="inline-flex items-center gap-1 px-2 py-1 bg-red-900 border border-red-400 rounded text-xs">
                  <span class="text-red-300 font-mono">ENCRYPTED</span>
                </div>
              </div>
            </td>

            <!-- Actions Column -->
            <td class="px-6 py-4">
              <div class="flex items-center justify-center gap-2">
                <!-- Edit Button -->
                <button @click="$emit('editMember', member)"
                  class="group/btn relative p-2 bg-blue-900 border border-blue-400 rounded hover:bg-blue-800 transition-all duration-200 hover:shadow-lg hover:shadow-blue-400/25"
                  title="EDIT_USER">
                  <svg class="w-4 h-4 text-blue-400 group-hover/btn:text-blue-300" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <div
                    class="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity">
                  </div>
                </button>

                <!-- Delete Button -->
                <button @click="$emit('deleteMember', member.id)"
                  class="group/btn relative p-2 bg-red-900 border border-red-400 rounded hover:bg-red-800 transition-all duration-200 hover:shadow-lg hover:shadow-red-400/25"
                  title="DELETE_USER">
                  <svg class="w-4 h-4 text-red-400 group-hover/btn:text-red-300" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <div
                    class="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity">
                  </div>
                </button>
              </div>
            </td>
          </tr>

          <!-- Empty State -->
          <tr v-if="members.length === 0">
            <td colspan="6" class="px-6 py-12 text-center">
              <div class="flex flex-col items-center gap-4">
                <div class="w-16 h-16 bg-gray-700 border border-gray-600 rounded-full flex items-center justify-center">
                  <span class="text-gray-400 text-2xl">⚠</span>
                </div>
                <div>
                  <div class="text-gray-300 font-mono text-lg mb-2">NO_DATA_FOUND</div>
                  <div class="text-gray-500 font-mono text-sm">DATABASE_EMPTY :: INITIALIZE_RECORDS</div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- System Footer -->
    <div class="bg-gray-750 border-t border-gray-600 px-6 py-3">
      <div class="flex items-center justify-between text-xs font-mono">
        <div class="flex items-center gap-4 text-gray-400">
          <span>RECORDS: {{ members.length }}</span>
          <span>•</span>
          <span>MEMORY: 2.4MB</span>
          <span>•</span>
          <span>CPU: 12%</span>
        </div>
        <div class="flex items-center gap-2 text-green-400">
          <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>SYSTEM_READY</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  members: {
    type: Array,
    default: () => [
      { id: 1, name: "John Doe", age: 28, email: "john@example.com", password: "password123" },
      { id: 2, name: "Jane Smith", age: 32, email: "jane@example.com", password: "secret456" },
      { id: 3, name: "Mike Johnson", age: 25, email: "mike@example.com", password: "mypass789" },
      { id: 4, name: "Sarah Wilson", age: 29, email: "sarah@example.com", password: "secure789" }
    ]
  }
});

const emits = defineEmits(["editMember", "deleteMember"]);
</script>

<style scoped>
.bg-gray-750 {
  background-color: #374151;
}
</style>