import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home.vue';
import BuildView from '../views/Build.vue';
import BuildStats from '../views/BuildStats.vue';
import SavedBuilds from '../views/SavedBuilds.vue';  // Add this line

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/build', name: 'Build', component: BuildView },
  { path: '/build-stats', name: 'BuildStats', component: BuildStats },
  { path: '/saved-builds', name: 'SavedBuilds', component: SavedBuilds }  // Add this line
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
