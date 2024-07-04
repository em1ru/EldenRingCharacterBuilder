<template>
  <div>
    <h2>Build Stats</h2>
    <div v-if="build">
      <p>Vigor: {{ build.stats.vigor }}</p>
      <p>Mind: {{ build.stats.mind }}</p>
      <p>Endurance: {{ build.stats.endurance }}</p>
      <p>Strength: {{ build.stats.strength }}</p>
      <p>Dexterity: {{ build.stats.dexterity }}</p>
      <p>Intelligence: {{ build.stats.intelligence }}</p>
      <p>Faith: {{ build.stats.faith }}</p>
      <p>Arcane: {{ build.stats.arcane }}</p>
      <p>Weapon: {{ build.equipment.weapon }}</p>
      <p>Armor: {{ build.equipment.armor }}</p>
      <p>Talisman: {{ build.equipment.talisman }}</p>
      <p>Attack Rating: {{ calculatedStats.attackRating }}</p>
      <p>Defense: {{ calculatedStats.defense }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'BuildStats',
  computed: {
    ...mapState(['build']),
    calculatedStats() {
      // Basic calculation logic, you can expand this
      const attackRating = this.build.stats.strength * 2 + this.build.stats.dexterity;
      const defense = this.build.stats.endurance * 1.5 + this.build.stats.vigor;
      return {
        attackRating,
        defense
      };
    }
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
