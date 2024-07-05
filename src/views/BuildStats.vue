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
      <p>Head: {{ build.equipment.head }}</p>
      <p>Body: {{ build.equipment.body }}</p>
      <p>Arms: {{ build.equipment.arms }}</p>
      <p>Legs: {{ build.equipment.legs }}</p>
      <p>Shield: {{ build.equipment.shield }}</p>
      <p>Talisman 1: {{ build.equipment.talisman1 }}</p>
      <p>Talisman 2: {{ build.equipment.talisman2 }}</p>
      <p>Talisman 3: {{ build.equipment.talisman3 }}</p>
      <p>Talisman 4: {{ build.equipment.talisman4 }}</p>
      <p>Attack Rating: {{ calculatedStats.attackRating }}</p>
      <p>Physical Defense: {{ calculatedStats.physicalDefense }}</p>
      <p>Magic Defense: {{ calculatedStats.magicDefense }}</p>
      <p>Fire Defense: {{ calculatedStats.fireDefense }}</p>
      <p>Lightning Defense: {{ calculatedStats.lightningDefense }}</p>
      <p>Holy Defense: {{ calculatedStats.holyDefense }}</p>
      <!-- Add more calculated stats as needed -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'BuildStats',
  computed: {
    ...mapState(['build', 'weapons', 'head', 'body', 'arms', 'legs', 'shields', 'talismans']),
    calculatedStats() {
      const getStatAmount = (item, statName) => {
        return item.dmgNegation ? (item.dmgNegation.find(stat => stat.name === statName)?.amount || 0) : 0;
      };

      const weapon = this.weapons.find(w => w.name === this.build.equipment.weapon) || {};
      const head = this.head.find(h => h.name === this.build.equipment.head) || {};
      const body = this.body.find(b => b.name === this.build.equipment.body) || {};
      const arms = this.arms.find(a => a.name === this.build.equipment.arms) || {};
      const legs = this.legs.find(l => l.name === this.build.equipment.legs) || {};
      const shield = this.shields.find(s => s.name === this.build.equipment.shield) || {};

      const attackRating = (this.build.stats.strength + this.build.stats.dexterity) * 2 
        + (weapon.attack ? weapon.attack.reduce((sum, stat) => sum + stat.amount, 0) : 0); // Example logic
      
      const physicalDefense = getStatAmount(head, 'Phy') + getStatAmount(body, 'Phy')
        + getStatAmount(arms, 'Phy') + getStatAmount(legs, 'Phy') + getStatAmount(shield, 'Phy');

      const magicDefense = getStatAmount(head, 'Mag') + getStatAmount(body, 'Mag')
        + getStatAmount(arms, 'Mag') + getStatAmount(legs, 'Mag') + getStatAmount(shield, 'Mag');

      const fireDefense = getStatAmount(head, 'Fire') + getStatAmount(body, 'Fire')
        + getStatAmount(arms, 'Fire') + getStatAmount(legs, 'Fire') + getStatAmount(shield, 'Fire');

      const lightningDefense = getStatAmount(head, 'Ligt') + getStatAmount(body, 'Ligt')
        + getStatAmount(arms, 'Ligt') + getStatAmount(legs, 'Ligt') + getStatAmount(shield, 'Ligt');

      const holyDefense = getStatAmount(head, 'Holy') + getStatAmount(body, 'Holy')
        + getStatAmount(arms, 'Holy') + getStatAmount(legs, 'Holy') + getStatAmount(shield, 'Holy');

      return {
        attackRating,
        physicalDefense,
        magicDefense,
        fireDefense,
        lightningDefense,
        holyDefense
      };
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
