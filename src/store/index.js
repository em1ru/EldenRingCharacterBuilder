// src/store/index.js
import { createStore } from 'vuex';
import { fetchWeapons, fetchArmors, fetchTalismans, fetchShields } from '../services/erdbService';

export default createStore({
  state: {
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
    },
    savedBuilds: [],
    weapons: [],
    armors: [],
    head: [],
    body: [],
    arms: [],
    legs: [],
    shields: [],
    talismans: []
  },
  mutations: {
    setBuild(state, build) {
      state.build = build;
    },
    saveBuild(state, build) {
      state.savedBuilds.push(build);
      localStorage.setItem('savedBuilds', JSON.stringify(state.savedBuilds));
    },
    loadBuilds(state) {
      const savedBuilds = localStorage.getItem('savedBuilds');
      if (savedBuilds) {
        state.savedBuilds = JSON.parse(savedBuilds);
      }
    },
    setWeapons(state, weapons) {
      console.log('Setting weapons in state:', weapons);
      state.weapons = weapons;
    },
    setArmors(state, armors) {
      console.log('Setting armors in state:', armors);
      state.armors = armors;
      state.head = armors.filter(armor => armor.category === 'Helm');
      state.body = armors.filter(armor => armor.category === 'Chest Armor');
      state.arms = armors.filter(armor => armor.category === 'Gauntlets');
      state.legs = armors.filter(armor => armor.category === 'Leg Armor');
    },
    setShields(state, shields) {
      console.log('Setting shields in state:', shields);
      state.shields = shields;
    },
    setTalismans(state, talismans) {
      console.log('Setting talismans in state:', talismans);
      state.talismans = talismans;
    }
  },
  actions: {
    updateBuild({ commit }, build) {
      commit('setBuild', build);
    },
    saveBuild({ commit }, build) {
      commit('saveBuild', build);
    },
    loadBuilds({ commit }) {
      commit('loadBuilds');
    },
    async fetchWeapons({ commit }) {
      try {
        const weapons = await fetchWeapons();
        commit('setWeapons', weapons);
      } catch (error) {
        console.error('Failed to fetch weapons:', error);
      }
    },
    async fetchArmors({ commit }) {
      try {
        const armors = await fetchArmors();
        commit('setArmors', armors);
      } catch (error) {
        console.error('Failed to fetch armors:', error);
      }
    },
    async fetchShields({ commit }) {
      try {
        const shields = await fetchShields();
        commit('setShields', shields);
      } catch (error) {
        console.error('Failed to fetch shields:', error);
      }
    },
    async fetchTalismans({ commit }) {
      try {
        const talismans = await fetchTalismans();
        commit('setTalismans', talismans);
      } catch (error) {
        console.error('Failed to fetch talismans:', error);
      }
    }
  },
  getters: {
    getBuild(state) {
      return state.build;
    },
    getSavedBuilds(state) {
      return state.savedBuilds;
    },
    getWeapons(state) {
      return state.weapons;
    },
    getHead(state) {
      return state.head;
    },
    getBody(state) {
      return state.body;
    },
    getArms(state) {
      return state.arms;
    },
    getLegs(state) {
      return state.legs;
    },
    getShields(state) {
      return state.shields;
    },
    getTalismans(state) {
      return state.talismans;
    }
  }
});
