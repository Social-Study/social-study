import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

Vue.use(Vuex);


// const vuexLocalStorage = new VuexPersist({
//   key="vuex",
//   storage: window.localStorage,
// })

const vuexLocalStorage = new VuexPersist({
  key: 'vuex', // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
})


export default new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  state: {
    uid: ""
  },
  mutations: {
    setUID(state, uid) {
      state.uid = uid;
    }
  },
  actions: {},
  getters: {
    uid: state => state.uid
  }
});
