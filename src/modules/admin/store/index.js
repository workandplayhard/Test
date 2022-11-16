const defaultSideBar = () => ({
  isVisible: true
});

const STATE = {
  sideBar: defaultSideBar()
};

const GETTERS = {
  sideBar: (state) => state.sideBar
};

const ACTIONS = {
  changeSideBarState({ commit }, payload) {
    commit('setSideBarState', payload);
  },
  resetSideBarState({ commit }) {
    commit('setSideBarState', defaultSideBar());
  }
};

const MUTATIONS = {
  setSideBarState(state, payload) {
    state.sideBar = {
      ...state.sideBar,
      ...payload
    };
  }
};

export const adminStore = {
  namespaced: true,
  state: STATE,
  getters: GETTERS,
  actions: ACTIONS,
  mutations: MUTATIONS
};
