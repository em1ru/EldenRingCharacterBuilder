<template>
  <div>
    <h2>Build Form</h2>
    <form @submit.prevent="submitBuild">
      <div v-for="(value, key) in build.stats" :key="key">
        <label :for="key">{{ key.charAt(0).toUpperCase() + key.slice(1) }}:</label>
        <input type="number" v-model="build.stats[key]" :id="key" min="0" required>
      </div>
      <WeaponSelector />
      <ArmorSelector />
      <div>
        <label for="helmet">Helmet:</label>
        <select v-model="build.equipment.helmet" @change="updateHelmet">
          <option v-for="helmet in helmets" :key="helmet.id" :value="helmet.name">
            {{ helmet.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="gauntlets">Gauntlets:</label>
        <select v-model="build.equipment.gauntlets" @change="updateGauntlets">
          <option v-for="gauntlets in gauntlets" :key="gauntlets.id" :value="gauntlets.name">
            {{ gauntlets.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="greaves">Greaves:</label>
        <select v-model="build.equipment.greaves" @change="updateGreaves">
          <option v-for="greaves in greaves" :key="greaves.id" :value="greaves.name">
            {{ greaves.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="shield">Shield:</label>
        <select v-model="build.equipment.shield" @change="updateShield">
          <option v-for="shield in shields" :key="shield.id" :value="shield.name">
            {{ shield.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="talisman1">Talisman 1:</label>
        <TalismanSelector v-model="build.equipment.talisman1" />
      </div>
      <div>
        <label for="talisman2">Talisman 2:</label>
        <TalismanSelector v-model="build.equipment.talisman2" />
      </div>
      <div>
        <label for="weaponUpgrade">Weapon Upgrade Level:</label>
        <input type="number" v-model="build.equipment.weaponUpgrade" id="weaponUpgrade" min="0" required>
      </div>
      <button type="submit">Calculate</button>
      <button type="button" @click="saveCurrentBuild">Save Build</button>
    </form>

    <!-- Details of selected items -->
    <div v-if="build.equipment.weapon">
      <h3>Selected Weapon</h3>
      <p>{{ selectedWeapon.name }}</p>
      <img :src="selectedWeapon.image" alt="Weapon Image" />
      <p>{{ selectedWeapon.description }}</p>
      <ul>
        <li v-for="(stat, index) in selectedWeapon.attack" :key="index">{{ stat.name }}: {{ stat.amount }}</li>
      </ul>
    </div>
    <div v-if="build.equipment.armor">
      <h3>Selected Armor</h3>
      <p>{{ selectedArmor.name }}</p>
      <img :src="selectedArmor.image" alt="Armor Image" />
      <p>{{ selectedArmor.description }}</p>
      <ul>
        <li v-for="(stat, index) in selectedArmor.dmgNegation" :key="index">{{ stat.name }}: {{ stat.amount }}</li>
      </ul>
    </div>
    <div v-if="build.equipment.helmet">
      <h3>Selected Helmet</h3>
      <p>{{ selectedHelmet.name }}</p>
      <img :src="selectedHelmet.image" alt="Helmet Image" />
      <p>{{ selectedHelmet.description }}</p>
      <ul>
        <li v-for="(stat, index) in selectedHelmet.dmgNegation" :key="index">{{ stat.name }}: {{ stat.amount }}</li>
      </ul>
    </div>
    <div v-if="build.equipment.gauntlets">
      <h3>Selected Gauntlets</h3>
      <p>{{ selectedGauntlets.name }}</p>
      <img :src="selectedGauntlets.image" alt="Gauntlets Image" />
      <p>{{ selectedGauntlets.description }}</p>
      <ul>
        <li v-for="(stat, index) in selectedGauntlets.dmgNegation" :key="index">{{ stat.name }}: {{ stat.amount }}</li>
      </ul>
    </div>
    <div v-if="build.equipment.greaves">
      <h3>Selected Greaves</h3>
      <p>{{ selectedGreaves.name }}</p>
      <img :src="selectedGreaves.image" alt="Greaves Image" />
      <p>{{ selectedGreaves.description }}</p>
      <ul>
        <li v-for="(stat, index) in selectedGreaves.dmgNegation" :key="index">{{ stat.name }}: {{ stat.amount }}</li>
      </ul>
    </div>
    <div v-if="build.equipment.shield">
      <h3>Selected Shield</h3>
      <p>{{ selectedShield.name }}</p>
      <img :src="selectedShield.image" alt="Shield Image" />
      <p>{{ selectedShield.description }}</p>
      <ul>
        <li v-for="(stat, index) in selectedShield.dmgNegation" :key="index">{{ stat.name }}: {{ stat.amount }}</li>
      </ul>
    </div>
    <div v-if="build.equipment.talisman1">
      <h3>Selected Talisman 1</h3>
      <p>{{ selectedTalisman1.name }}</p>
      <img :src="selectedTalisman1.image" alt="Talisman Image" />
      <p>{{ selectedTalisman1.description }}</p>
      <p>{{ selectedTalisman1.effect }}</p>
    </div>
    <div v-if="build.equipment.talisman2">
      <h3>Selected Talisman 2</h3>
      <p>{{ selectedTalisman2.name }}</p>
      <img :src="selectedTalisman2.image" alt="Talisman Image" />
      <p>{{ selectedTalisman2.description }}</p>
      <p>{{ selectedTalisman2.effect }}</p>
    </div>
  </div>
</template>

<script>
import WeaponSelector from '../components/WeaponSelector.vue';
import ArmorSelector from '../components/ArmorSelector.vue';
import TalismanSelector from '../components/TalismanSelector.vue';
import { mapState } from 'vuex';

export default {
  name: 'BuildForm',
  components: {
    WeaponSelector,
    ArmorSelector,
    TalismanSelector
  },
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
          helmet: '',
          gauntlets: '',
          greaves: '',
          shield: '',
          talisman1: '',
          talisman2: ''
        }
      }
    };
  },
  computed: {
    ...mapState(['weapons', 'armors', 'helmets', 'gauntlets', 'greaves', 'shields', 'talismans']),
    selectedWeapon() {
      return this.weapons.find(weapon => weapon.name === this.build.equipment.weapon) || {};
    },
    selectedArmor() {
      return this.armors.find(armor => armor.name === this.build.equipment.armor) || {};
    },
    selectedHelmet() {
      return this.helmets.find(helmet => helmet.name === this.build.equipment.helmet) || {};
    },
    selectedGauntlets() {
      return this.gauntlets.find(gauntlets => gauntlets.name === this.build.equipment.gauntlets) || {};
    },
    selectedGreaves() {
      return this.greaves.find(greaves => greaves.name === this.build.equipment.greaves) || {};
    },
    selectedShield() {
      return this.shields.find(shield => shield.name === this.build.equipment.shield) || {};
    },
    selectedTalisman1() {
      return this.talismans.find(talisman => talisman.name === this.build.equipment.talisman1) || {};
    },
    selectedTalisman2() {
      return this.talismans.find(talisman => talisman.name === this.build.equipment.talisman2) || {};
    }
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
    },
    updateHelmet(event) {
      this.build.equipment.helmet = event.target.value;
    },
    updateGauntlets(event) {
      this.build.equipment.gauntlets = event.target.value;
    },
    updateGreaves(event) {
      this.build.equipment.greaves = event.target.value;
    },
    updateShield(event) {
      this.build.equipment.shield = event.target.value;
    }
  }
};
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
img {
  width: 100px;
  height: auto;
}
</style>
