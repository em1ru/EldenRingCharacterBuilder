<template>
    <div>
      <label for="talisman">Talisman:</label>
      <select v-model="selectedTalisman" @change="updateTalisman">
        <option v-for="talisman in talismans" :key="talisman.name" :value="talisman.name">
          {{ talisman.name }}
        </option>
      </select>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    name: 'TalismanSelector',
    data() {
      return {
        selectedTalisman: ''
      };
    },
    computed: {
      ...mapGetters(['getTalismans']),
      talismans() {
        return this.getTalismans;
      }
    },
    methods: {
      ...mapActions(['updateBuild']),
      updateTalisman(event) {
        const talisman = event.target.value;
        this.$store.dispatch('updateBuild', {
          ...this.$store.state.build,
          equipment: { ...this.$store.state.build.equipment, talisman }
        });
      }
    },
    watch: {
      selectedTalisman(newTalisman) {
        this.updateTalisman({ target: { value: newTalisman } });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  