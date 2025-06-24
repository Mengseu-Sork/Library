<template>
  <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden">
    <!-- Table Header with Actions -->
    <div class="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200/50">
      <div class="flex items-center justify-between">
        <!-- Left side - Title and Actions -->
        <div class="flex items-center space-x-4">
          <h3 class="text-xl font-bold text-slate-800 flex items-center">
            <span class="text-2xl mr-3">👥</span>
            Members Directory
          </h3>
          <div class="flex items-center space-x-2">
            <!-- Create Button -->
            <button
              @click="$emit('create')"
              class="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-md flex items-center group"
            >
              <span class="mr-2 group-hover:scale-110 transition-transform">➕</span>
              Create Member
            </button>
            
            <!-- Action Buttons -->
            <button class="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200">
              <span class="text-slate-600">🔄</span>
            </button>
            <button class="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200">
              <span class="text-slate-600">✏️</span>
            </button>
            <button class="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200">
              <span class="text-slate-600">🗑️</span>
            </button>
            
            <!-- More Dropdown -->
            <div class="relative">
              <button class="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200 flex items-center">
                <span class="text-slate-600 mr-1">More</span>
                <span class="text-slate-400">▼</span>
              </button>
            </div>
            
            <!-- Filter Dropdown -->
            <div class="relative">
              <button class="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200 flex items-center">
                <span class="text-slate-600 mr-1">Filter by</span>
                <span class="text-slate-400">▼</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Right side - Search -->
        <div class="flex items-center space-x-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search all columns"
            class="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-300 bg-white/80 w-64"
          />
        </div>
      </div>
    </div>

    <!-- Show Entries and Info -->
    <div class="bg-slate-50/50 px-6 py-3 border-b border-slate-200/50 flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-2">
          <span class="text-sm text-slate-600">Show</span>
          <select 
            v-model="entriesPerPage"
            class="px-2 py-1 border border-slate-300 rounded text-sm bg-white"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span class="text-sm text-slate-600">entries</span>
        </div>
      </div>
      <div class="text-sm text-slate-500">
        {{ filteredMembers.length }} total members
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="bg-gradient-to-r from-slate-700 to-slate-600 text-white">
            <th class="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider w-16">
              <input type="checkbox" class="rounded border-slate-300" />
            </th>
            <th class="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
              <span class="flex items-center">
                Member ID
                <span class="ml-1 text-slate-300">⇅</span>
              </span>
            </th>
            <th class="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
              <span class="flex items-center">
                <span class="mr-2">👤</span>
                Name
                <span class="ml-1 text-slate-300">⇅</span>
              </span>
            </th>
            <th class="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
              <span class="flex items-center">
                <span class="mr-2">🎂</span>
                Age
                <span class="ml-1 text-slate-300">⇅</span>
              </span>
            </th>
            <th class="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
              <span class="flex items-center">
                <span class="mr-2">📧</span>
                Email
                <span class="ml-1 text-slate-300">⇅</span>
              </span>
            </th>
            <th class="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
              <span class="flex items-center">
                <span class="mr-2">📅</span>
                Join Date
                <span class="ml-1 text-slate-300">⇅</span>
              </span>
            </th>
            <th class="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
              <span class="flex items-center">
                <span class="mr-2">📊</span>
                Status
                <span class="ml-1 text-slate-300">⇅</span>
              </span>
            </th>
            <th class="px-6 py-4 text-center font-semibold text-sm uppercase tracking-wider">
              <span class="flex items-center justify-center">
                <span class="mr-2">⚡</span>
                Action
              </span>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200/50">
          <tr 
            v-for="(member, index) in paginatedMembers" 
            :key="member.id"
            class="group hover:bg-slate-50/50 transition-all duration-300"
            :class="{ 'bg-slate-50/30': index % 2 === 0 }"
          >
            <td class="px-6 py-4">
              <input type="checkbox" class="rounded border-slate-300" />
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center">
                <div class="w-8 h-8 bg-slate-600 text-white rounded-lg flex items-center justify-center text-sm font-bold group-hover:bg-slate-700 transition-colors">
                  {{ String(member.id).padStart(2, '0') }}
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center text-white font-bold mr-3 group-hover:scale-110 transition-transform">
                  {{ member.name.charAt(0).toUpperCase() }}
                </div>
                <div>
                  <div class="font-semibold text-slate-800 group-hover:text-slate-900">{{ member.name }}</div>
                  <div class="text-sm text-slate-500">Library Member</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-800 group-hover:bg-slate-200 transition-colors">
                {{ member.age }} years
              </span>
            </td>
            <td class="px-6 py-4">
              <div class="text-slate-700 font-medium group-hover:text-slate-900 transition-colors">
                {{ member.email }}
              </div>
              <div class="text-sm text-slate-500">Personal Email</div>
            </td>
            <td class="px-6 py-4">
              <div class="text-slate-700 group-hover:text-slate-900 transition-colors">
                {{ formatDate(member.created_at) }}
              </div>
              <div class="text-sm text-slate-500">Registration</div>
            </td>
            <td class="px-6 py-4">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 group-hover:bg-green-200 transition-colors">
                <div class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                Active
              </span>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center justify-center">
                <div class="relative">
                  <button
                    @click="toggleActionMenu(member.id)"
                    class="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200 group-hover:scale-110"
                  >
                    <span class="text-slate-600">⚙️</span>
                  </button>
                  
                  <!-- Action Dropdown -->
                  <div 
                    v-if="activeActionMenu === member.id"
                    class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200 z-10"
                  >
                    <button
                      @click="handleEdit(member)"
                      class="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center text-slate-700 hover:text-slate-900"
                    >
                      <span class="mr-2">✏️</span>
                      Edit Member
                    </button>
                    <button
                      @click="handleDelete(member.id)"
                      class="w-full text-left px-4 py-2 hover:bg-red-50 flex items-center text-red-600 hover:text-red-700"
                    >
                      <span class="mr-2">🗑️</span>
                      Delete Member
                    </button>
                    
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="bg-slate-50/50 px-6 py-4 border-t border-slate-200/50">
      <div class="flex items-center justify-between">
        <div class="text-sm text-slate-600">
          Showing {{ startEntry }} to {{ endEntry }} of {{ filteredMembers.length }} entries
        </div>
        <div class="flex items-center space-x-2">
          <button
            @click="previousPage"
            :disabled="currentPage === 1"
            class="px-3 py-1 border border-slate-300 rounded text-sm hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ‹
          </button>
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'px-3 py-1 border text-sm rounded',
              currentPage === page 
                ? 'bg-slate-600 text-white border-slate-600' 
                : 'border-slate-300 hover:bg-slate-50'
            ]"
          >
            {{ page }}
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 border border-slate-300 rounded text-sm hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  members: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['editMember', 'deleteMember', 'create'])

// Reactive data
const searchQuery = ref('')
const entriesPerPage = ref(10)
const currentPage = ref(1)
const activeActionMenu = ref(null)

// Computed properties
const filteredMembers = computed(() => {
  if (!searchQuery.value) return props.members
  
  return props.members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const totalPages = computed(() => {
  return Math.ceil(filteredMembers.value.length / entriesPerPage.value)
})

const paginatedMembers = computed(() => {
  const start = (currentPage.value - 1) * entriesPerPage.value
  const end = start + entriesPerPage.value
  return filteredMembers.value.slice(start, end)
})

const startEntry = computed(() => {
  return (currentPage.value - 1) * entriesPerPage.value + 1
})

const endEntry = computed(() => {
  const end = currentPage.value * entriesPerPage.value
  return Math.min(end, filteredMembers.value.length)
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// Methods
const toggleActionMenu = (memberId) => {
  activeActionMenu.value = activeActionMenu.value === memberId ? null : memberId
}

const handleEdit = (member) => {
  activeActionMenu.value = null
  emit('editMember', member)
}

const handleDelete = (memberId) => {
  activeActionMenu.value = null
  emit('deleteMember', memberId)
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page) => {
  currentPage.value = page
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  })
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    activeActionMenu.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
