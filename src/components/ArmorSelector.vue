<template>
  <div>
    <input v-model="searchQuery" placeholder="Search..." />
    <select v-model="selectedArmor" @change="updateArmor">
      <option v-for="armor in filteredArmors" :key="armor.id" :value="armor.name">
        {{ armor.name }}
      </option>
    </select>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ArmorSelector',
  data() {
    return {
      selectedArmor: '',
      searchQuery: ''
    };
  },
  computed: {
    ...mapGetters(['getArmors']),
    filteredArmors() {
      return this.getArmors.filter(armor => 
        armor.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    ...mapActions(['updateBuild']),
    updateArmor(event) {
      const armor = event.target.value;
      this.$store.dispatch('updateBuild', {
        ...this.$store.state.build,
        equipment: { ...this.$store.state.build.equipment, armor }
      });
    }
  },
  watch: {
    selectedArmor(newArmor) {
      this.updateArmor({ target: { value: newArmor } });
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
