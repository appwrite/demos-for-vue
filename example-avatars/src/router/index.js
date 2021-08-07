import { createRouter, createWebHistory } from 'vue-router';
import Home from '/src/views/Home.vue';

const routes = [
    {
        path: '/home',
        name: 'Home',
        component: Home,
    },
    {
        path: '/',
        name: 'Login',
        component: () => import('../views/Login.vue'),
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: () => import('../views/SignUp.vue'),
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
