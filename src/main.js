import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/styles.css';

const app = createApp(App);

app.use(router);
app.use(store);

store.dispatch('loadBuilds');  // Add this line

app.mount('#app');
