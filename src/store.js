import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    uid: "",
    photoURL: "",
    // user: null,
    chatActive: false,
    sidebarActive: true
  },
  mutations: {
    // Logged in user's identifier
    setUID(state, uid) {
      state.uid = uid;
    },
    setPhoto(state, url) {
      state.photoURL = url;
    },
    toggleChatActive(state) {
      state.chatActive = !state.chatActive;
    },
    toggleSidebarActive(state) {
      state.sidebarActive = !state.sidebarActive;
    }
  },
  actions: {},
  getters: {
    uid: state => state.uid,
    photoURL: state => state.photoURL,
    chatActive: state => state.chatActive,
    sidebarActive: state => state.sidebarActive
  }
});
