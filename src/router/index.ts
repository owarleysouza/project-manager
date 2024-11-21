import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue'),
  },
  {
    path: '/edit-project/:id',
    name: 'EditProject',
    component: () => import('../pages/EditProject.vue'),
  },
  {
    path: '/create-project',
    name: 'CreateProject',
    component: () => import('../pages/CreateProject.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
