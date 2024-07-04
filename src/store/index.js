import { createStore } from 'vuex';

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
        armor: '',
        talisman: ''
      }
    },
    savedBuilds: []  // Add this line
  },
  mutations: {
    setBuild(state, build) {
      state.build = build;
    },
    saveBuild(state, build) {  // Add this mutation
      state.savedBuilds.push(build);
      localStorage.setItem('savedBuilds', JSON.stringify(state.savedBuilds));
    },
    loadBuilds(state) {  // Add this mutation
      const savedBuilds = localStorage.getItem('savedBuilds');
      if (savedBuilds) {
        state.savedBuilds = JSON.parse(savedBuilds);
      }
    }
  },
  actions: {
    updateBuild({ commit }, build) {
      commit('setBuild', build);
    },
    saveBuild({ commit }, build) {  // Add this action
      commit('saveBuild', build);
    },
    loadBuilds({ commit }) {  // Add this action
      commit('loadBuilds');
    }
  },
  getters: {
    getBuild(state) {
      return state.build;
    },
    getSavedBuilds(state) {  // Add this getter
      return state.savedBuilds;
    }
  }
});
