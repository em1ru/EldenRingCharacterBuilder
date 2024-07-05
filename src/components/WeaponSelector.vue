<template>
  <div>
    <input v-model="searchQuery" placeholder="Search..." />
    <select v-model="selectedWeapon" @change="updateWeapon">
      <option v-for="weapon in filteredWeapons" :key="weapon.id" :value="weapon.name">
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
      selectedWeapon: '',
      searchQuery: ''
    };
  },
  computed: {
    ...mapGetters(['getWeapons']),
    filteredWeapons() {
      return this.getWeapons.filter(weapon => 
        weapon.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
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
