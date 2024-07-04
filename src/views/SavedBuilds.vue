<template>
    <div>
      <h2>Saved Builds</h2>
      <ul>
        <li v-for="(build, index) in savedBuilds" :key="index">
          <button @click="loadBuild(build)">Load</button>
          {{ build.stats }} - {{ build.equipment }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    name: 'SavedBuilds',
    computed: {
      ...mapGetters(['getSavedBuilds']),
      savedBuilds() {
        return this.getSavedBuilds;
      }
    },
    methods: {
      ...mapActions(['updateBuild']),
      loadBuild(build) {
        this.updateBuild(build);
        this.$router.push('/build-stats');
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  