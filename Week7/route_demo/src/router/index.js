import { createRouter, createWebHistory } from 'vue-router'
// 1. Import the pages we just created
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
const router = createRouter({
 // createWebHistory ensures our URLs look normal (e.g., /about)
 // instead of having a hash in them (e.g., /#/about)
  history: createWebHistory(),

  // 2. Map the URLs to the Components
  routes: [
    { path: '/', component: HomeView },
    { path: '/about', component: AboutView }
  ]
})
export default router