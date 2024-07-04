<template>
  <div id="app">
    <NavBarComponent />
    <router-view />
  </div>
</template>

<script>
import NavBarComponent from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    NavBarComponent
  }
}
</script>

<style>
/* Add your styles here */
</style>
