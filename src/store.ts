import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLoading: false,
    isLoggedIn: false,
    error: null,
  },
  mutations: {
    setAuth(state, payload) {
      state.isLoading = payload.isLoading;
      state.isLoggedIn = payload.isLoggedIn;
      state.error = payload.error;
    },
    initialiseStore(state) {
      const localStore = sessionStorage.getItem('store');

      if (localStore) {
        const payload = JSON.parse(localStore);
        this.replaceState(Object.assign(state, payload), payload);
      }
    },
  },
  actions: {
    setAuth(context, payload) {
      context.commit('setAuth', payload);
    },
    initialiseStore(context) {
      context.commit('initialiseStore');
    },
  },
  strict: true,
});

// Subscribe to store updates
store.subscribe((mutation, state) => {
  // Store the state object as a JSON
  sessionStorage.setItem('store', JSON.stringify(state));
});

export default store;
