import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

Vue.use(Vuex);

// const vuexLocalStorage = new VuexPersist({
//   key="vuex",
//   storage: window.localStorage,
// })

const vuexLocalStorage = new VuexPersist({
  key: "vuex", // The key to store the state on in the storage provider.
  storage: window.localStorage // or window.sessionStorage or localForage
});

export default new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  state: {
    uid: "",
    activeGroup: {
      groupID: "",
      details: null
    }
  },
  mutations: {
    // Logged in user's identifier
    setUID(state, uid) {
      state.uid = uid;
    },
    // This is to store the currently active group between study group feature pages
    // Prevents having to reload from the firebase firestore on switches
    // the details is just the surface level group data, not the study group subcollections
    setActiveGroup(state, { details, groupID }) {
      state.activeGroup.details = details;
      state.activeGroup.groupID = groupID;
    }
  },
  actions: {},
  getters: {
    uid: state => state.uid,
    activeGroup: state => state.activeGroup
  }
});
