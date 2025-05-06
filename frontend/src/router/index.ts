import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', redirect: '/products' },
  { path: '/products', component: () => import('../pages/ProductsPage.vue') },
  { path: '/stock', component: () => import('../pages/StockPage.vue') },
  { path: '/payables', component: () => import('../pages/PayablesPage.vue') },
  { path: '/receivables', component: () => import('../pages/ReceivablesPage.vue') },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
