import {
  createRouter,
  createWebHistory,
  type Router,
  type RouteRecordRaw,
  type RouterHistory,
} from 'vue-router';
import RootLayout from '@/layouts/root-layout/RootLayout.vue';

const routes: readonly RouteRecordRaw[] = [
  {
    path: '/',
    name: 'App',
    component: RootLayout,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: '/',
        redirect: '/home',
      },
    ],
  },
];

const history: RouterHistory = createWebHistory(import.meta.env.BASE_URL);

const router: Router = createRouter({
  history,
  routes,
});

export default router;
