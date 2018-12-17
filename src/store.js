import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
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
