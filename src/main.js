import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/styles.css';

const app = createApp(App);

app.use(router);
app.use(store);

store.dispatch('loadBuilds'); // Load saved builds
store.dispatch('fetchWeapons'); // Fetch weapons data
store.dispatch('fetchArmors'); // Fetch armors data
store.dispatch('fetchShields'); // Fetch shields data
store.dispatch('fetchTalismans'); // Fetch talismans data

app.mount('#app');
