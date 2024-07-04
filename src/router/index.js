import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home.vue';
import BuildView from '../views/Build.vue';
import BuildStats from '../views/BuildStats.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/build', name: 'Build', component: BuildView },
  { path: '/build-stats', name: 'BuildStats', component: BuildStats }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
