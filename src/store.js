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
      className: "",
      instructorName: "",
      memberCount: null,
      groupID: ""
    }
  },
  mutations: {
    // Logged in user's identifier
    setUID(state, uid) {
      state.uid = uid;
    },
    // Store the current group's details so the sidebar has access to them
    setActiveGroupDetails(
      state,
      { className, instructorName, memberCount, groupID }
    ) {
      state.activeGroup.className = className;
      state.activeGroup.instructorName = instructorName;
      state.activeGroup.memberCount = memberCount;
      state.activeGroup.groupID = groupID;
    }
  },
  actions: {},
  getters: {
    uid: state => state.uid,
    activeGroup: state => state.activeGroup
  }
});
