import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'
import { useUserStore } from '../stores/user';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/profile', name: 'profile', 
        component: () => import('../views/ProfileView.vue'), 
        meta: { requiresAuth: true }} // 1. THE TAG: Flag this as protected }
    ]
})

router.beforeEach((to, from, next) => {
    // Safe to initialize the store here!
    const userStore = useUserStore();
    // If the route has the red flag AND the user is not logged in...
    if (to.meta.requiresAuth && !userStore.user.loggedIn) {
        alert("🛑 You must be logged in to view this page.");
        next({
            path: '/login',
            query: { redirect: to.fullPath } // Save their intended destination!
        });
    }else {
        next(); // Otherwise, let them through normally
    }
});
export default router;
