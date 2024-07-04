import { createStore } from 'vuex';

export default createStore({
  state: {
    build: {
      stats: {},
      equipment: {}
    }
  },
  mutations: {
    setBuild(state, build) {
      state.build = build;
    }
  },
  actions: {
    updateBuild({ commit }, build) {
      commit('setBuild', build);
    }
  },
  getters: {
    getBuild(state) {
      return state.build;
    }
  }
});
