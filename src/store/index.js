// src/store/index.js
import { createStore } from 'vuex';
import { fetchWeapons, fetchArmors, fetchTalismans } from '../services/erdbService';

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
        weaponUpgrade: 0,
        armor: '',
        talisman1: '',
        talisman2: ''
      }
    },
    savedBuilds: [],
    weapons: [],
    armors: [],
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
    getArmors(state) {
      return state.armors;
    },
    getTalismans(state) {
      return state.talismans;
    }
  }
});
