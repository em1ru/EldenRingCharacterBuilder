<template>
    <div>
      <h1>Saved Builds</h1>
      <div v-if="savedBuilds && savedBuilds.length > 0">
        <div v-for="(build, index) in savedBuilds" :key="index">
          <h3>Build {{ index + 1 }}</h3>
          <p>Vigor: {{ build.stats.vigor }}</p>
          <p>Mind: {{ build.stats.mind }}</p>
          <p>Endurance: {{ build.stats.endurance }}</p>
          <p>Strength: {{ build.stats.strength }}</p>
          <p>Dexterity: {{ build.stats.dexterity }}</p>
          <p>Intelligence: {{ build.stats.intelligence }}</p>
          <p>Faith: {{ build.stats.faith }}</p>
          <p>Arcane: {{ build.stats.arcane }}</p>
          <p>Weapon: {{ build.equipment.weapon }}</p>
          <p>Head: {{ build.equipment.head }}</p>
          <p>Body: {{ build.equipment.body }}</p>
          <p>Arms: {{ build.equipment.arms }}</p>
          <p>Legs: {{ build.equipment.legs }}</p>
          <p>Shield: {{ build.equipment.shield }}</p>
          <p>Talisman 1: {{ build.equipment.talisman1 }}</p>
          <p>Talisman 2: {{ build.equipment.talisman2 }}</p>
          <p>Talisman 3: {{ build.equipment.talisman3 }}</p>
          <p>Talisman 4: {{ build.equipment.talisman4 }}</p>
        </div>
      </div>
      <div v-else>
        <p>No saved builds found.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex';
  
  export default {
    name: 'SavedBuilds',
    computed: {
      ...mapState(['savedBuilds'])
    },
    created() {
      this.loadBuilds();
    },
    methods: {
      ...mapActions(['loadBuilds'])
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  