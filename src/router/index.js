import { createRouter, createWebHistory } from 'vue-router'
import MembersView from '@/views/MembersView.vue'
import DashboardView from '@/views/DashboardView.vue'
import BooksView from '@/views/BooksView.vue'
import LibrariansView from '@/views/LibrariansView.vue'
import BorrowsView from '@/views/BorrowsView.vue'
import CategoriesView from '@/views/CategoriesView.vue'

const routes = [
  { path: '/', name: 'Dashboard', component: DashboardView  },
  { path: '/members', name: 'Members', component: MembersView },
  { path: '/books', name: 'Books', component: BooksView },
  { path: '/librarians', name: 'Librarians', component: LibrariansView },
  { path: '/borrows', name: 'Borrows', component: BorrowsView },
  { path: '/categories', name: 'Categories', component: CategoriesView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
