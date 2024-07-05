<template>
  <div>
    <h2>Build Form</h2>
    <form @submit.prevent="submitBuild">
      <div v-for="(value, key) in build.stats" :key="key">
        <label :for="key">{{ key.charAt(0).toUpperCase() + key.slice(1) }}:</label>
        <input type="number" v-model="build.stats[key]" :id="key" min="0" required>
      </div>
      <WeaponSelector />
      <div>
        <label for="head">Head:</label>
        <select v-model="build.equipment.head" @change="updateHead">
          <option v-for="head in head" :key="head.id" :value="head.name">
            {{ head.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="body">Body:</label>
        <select v-model="build.equipment.body" @change="updateBody">
          <option v-for="body in body" :key="body.id" :value="body.name">
            {{ body.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="arms">Arms:</label>
        <select v-model="build.equipment.arms" @change="updateArms">
          <option v-for="arms in arms" :key="arms.id" :value="arms.name">
            {{ arms.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="legs">Legs:</label>
        <select v-model="build.equipment.legs" @change="updateLegs">
          <option v-for="legs in legs" :key="legs.id" :value="legs.name">
            {{ legs.name }}
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
        <label for="talisman3">Talisman 3:</label>
        <TalismanSelector v-model="build.equipment.talisman3" />
      </div>
      <div>
        <label for="talisman4">Talisman 4:</label>
        <TalismanSelector v-model="build.equipment.talisman4" />
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
    <div v-if="build.equipment.head">
      <h3>Selected Head</h3>
      <p>{{ selectedHead.name }}</p>
      <img :src="selectedHead.image" alt="Head Image" />
      <p>{{ selectedHead.description }}</p>
      <ul>
        <li v-for="(stat, index) in selectedHead.dmgNegation" :key="index">{{ stat.name }}: {{ stat.amount }}</li>
      </ul>
    </div>
    <div v-if="build.equipment.body">
      <h3>Selected Body</h3>
      <p>{{ selectedBody.name }}</p>
      <img :src="selectedBody.image" alt="Body Image" />
      <p>{{ selectedBody.description }}</p>
      <ul>
        <li v-for="(stat, index) in selectedBody.dmgNegation" :key="index">{{ stat.name }}: {{ stat.amount }}</li>
      </ul>
    </div>
    <div v-if="build.equipment.arms">
      <h3>Selected Arms</h3>
      <p>{{ selectedArms.name }}</p>
      <img :src="selectedArms.image" alt="Arms Image" />
      <p>{{ selectedArms.description }}</p>
      <ul>
        <li v-for="(stat, index) in selectedArms.dmgNegation" :key="index">{{ stat.name }}: {{ stat.amount }}</li>
      </ul>
    </div>
    <div v-if="build.equipment.legs">
      <h3>Selected Legs</h3>
      <p>{{ selectedLegs.name }}</p>
      <img :src="selectedLegs.image" alt="Legs Image" />
      <p>{{ selectedLegs.description }}</p>
      <ul>
        <li v-for="(stat, index) in selectedLegs.dmgNegation" :key="index">{{ stat.name }}: {{ stat.amount }}</li>
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
    <div v-if="build.equipment.talisman3">
      <h3>Selected Talisman 3</h3>
      <p>{{ selectedTalisman3.name }}</p>
      <img :src="selectedTalisman3.image" alt="Talisman Image" />
      <p>{{ selectedTalisman3.description }}</p>
      <p>{{ selectedTalisman3.effect }}</p>
    </div>
    <div v-if="build.equipment.talisman4">
      <h3>Selected Talisman 4</h3>
      <p>{{ selectedTalisman4.name }}</p>
      <img :src="selectedTalisman4.image" alt="Talisman Image" />
      <p>{{ selectedTalisman4.description }}</p>
      <p>{{ selectedTalisman4.effect }}</p>
    </div>
  </div>
</template>

<script>
import WeaponSelector from '../components/WeaponSelector.vue';
import TalismanSelector from '../components/TalismanSelector.vue';
import { mapState } from 'vuex';

export default {
  name: 'BuildForm',
  components: {
    WeaponSelector,
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
          head: '',
          body: '',
          arms: '',
          legs: '',
          shield: '',
          talisman1: '',
          talisman2: '',
          talisman3: '',
          talisman4: ''
        }
      }
    };
  },
  computed: {
    ...mapState(['weapons', 'head', 'body', 'arms', 'legs', 'shields', 'talismans']),
    selectedWeapon() {
      return this.weapons.find(weapon => weapon.name === this.build.equipment.weapon) || {};
    },
    selectedHead() {
      return this.head.find(head => head.name === this.build.equipment.head) || {};
    },
    selectedBody() {
      return this.body.find(body => body.name === this.build.equipment.body) || {};
    },
    selectedArms() {
      return this.arms.find(arms => arms.name === this.build.equipment.arms) || {};
    },
    selectedLegs() {
      return this.legs.find(legs => legs.name === this.build.equipment.legs) || {};
    },
    selectedShield() {
      return this.shields.find(shield => shield.name === this.build.equipment.shield) || {};
    },
    selectedTalisman1() {
      return this.talismans.find(talisman => talisman.name === this.build.equipment.talisman1) || {};
    },
    selectedTalisman2() {
      return this.talismans.find(talisman => talisman.name === this.build.equipment.talisman2) || {};
    },
    selectedTalisman3() {
      return this.talismans.find(talisman => talisman.name === this.build.equipment.talisman3) || {};
    },
    selectedTalisman4() {
      return this.talismans.find(talisman => talisman.name === this.build.equipment.talisman4) || {};
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
      const builds = JSON.parse(localStorage.getItem('savedBuilds')) || [];
      builds.push(this.build);
      localStorage.setItem('savedBuilds', JSON.stringify(builds));
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
    updateHead(event) {
      this.build.equipment.head = event.target.value;
    },
    updateBody(event) {
      this.build.equipment.body = event.target.value;
    },
    updateArms(event) {
      this.build.equipment.arms = event.target.value;
    },
    updateLegs(event) {
      this.build.equipment.legs = event.target.value;
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
