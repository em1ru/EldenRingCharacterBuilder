<template>
    <div>
      <h2>Build Form</h2>
      <form @submit.prevent="submitBuild">
        <div v-for="(value, key) in build.stats" :key="key">
          <label :for="key">{{ key.charAt(0).toUpperCase() + key.slice(1) }}:</label>
          <input type="number" v-model="build.stats[key]" :id="key" min="0" required>
        </div>
        <div>
          <label for="weapon">Weapon:</label>
          <input type="text" v-model="build.equipment.weapon" id="weapon" required>
        </div>
        <div>
          <label for="weaponUpgrade">Weapon Upgrade Level:</label>
          <input type="number" v-model="build.equipment.weaponUpgrade" id="weaponUpgrade" min="0" required>
        </div>
        <div>
          <label for="armor">Armor:</label>
          <input type="text" v-model="build.equipment.armor" id="armor" required>
        </div>
        <div>
          <label for="talisman1">Talisman 1:</label>
          <input type="text" v-model="build.equipment.talisman1" id="talisman1" required>
        </div>
        <div>
          <label for="talisman2">Talisman 2:</label>
          <input type="text" v-model="build.equipment.talisman2" id="talisman2" required>
        </div>
        <button type="submit">Calculate</button>
        <button type="button" @click="saveCurrentBuild">Save Build</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BuildForm',
    data() {
      return {
        build: {
          stats: {
            vigor: 0,
            mind: 0,
            endurance: 0,
            strength: 0,
            dexterity: 0,
            intelligence: 0,
            faith: 0,
            arcane: 0
          },
          equipment: {
            weapon: '',
            weaponUpgrade: 0,
            armor: '',
            talisman1: '',
            talisman2: ''
          }
        }
      };
    },
    methods: {
      submitBuild() {
        if (this.validateForm()) {
          this.$store.dispatch('updateBuild', this.build);
          this.$router.push('/build-stats');
        }
      },
      saveCurrentBuild() {
        this.$store.dispatch('saveBuild', this.build);
        alert('Build saved successfully!');
      },
      validateForm() {
        for (let stat in this.build.stats) {
          if (this.build.stats[stat] < 0) {
            alert('Stats cannot be negative.');
            return false;
          }
        }
        return true;
      }
    }
  }
  </script>
  
  <style scoped>
  form {
    display: flex;
    flex-direction: column;
  }
  div {
    margin-bottom: 10px;
  }
  label {
    margin-right: 10px;
  }
  button {
    align-self: flex-start;
  }
  </style>
  