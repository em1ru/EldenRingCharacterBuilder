<template>
  <div>
    <input v-model="searchQuery" placeholder="Search..." />
    <select v-model="selectedTalisman" @change="updateTalisman">
      <option v-for="talisman in filteredTalismans" :key="talisman.id" :value="talisman.name">
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
      selectedTalisman: '',
      searchQuery: ''
    };
  },
  computed: {
    ...mapGetters(['getTalismans']),
    filteredTalismans() {
      return this.getTalismans.filter(talisman => 
        talisman.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
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
