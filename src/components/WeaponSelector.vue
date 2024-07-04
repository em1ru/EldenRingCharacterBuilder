<template>
    <div>
      <label for="weapon">Weapon:</label>
      <select v-model="selectedWeapon" @change="updateWeapon">
        <option v-for="weapon in weapons" :key="weapon.id" :value="weapon.name">
          {{ weapon.name }}
        </option>
      </select>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    name: 'WeaponSelector',
    data() {
      return {
        selectedWeapon: ''
      };
    },
    computed: {
      ...mapGetters(['getWeapons']),
      weapons() {
        console.log('Weapons in component:', this.getWeapons);
        return this.getWeapons;
      }
    },
    methods: {
      ...mapActions(['updateBuild']),
      updateWeapon(event) {
        const weapon = event.target.value;
        this.$store.dispatch('updateBuild', {
          ...this.$store.state.build,
          equipment: { ...this.$store.state.build.equipment, weapon }
        });
      }
    },
    watch: {
      selectedWeapon(newWeapon) {
        this.updateWeapon({ target: { value: newWeapon } });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  