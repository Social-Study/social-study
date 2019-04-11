// SCI ID: 048
// Name: store
// Version: 1.0

import Vue from "vue";
import Vuex from "vuex";

import { db } from "@/firebaseConfig";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    uid: "",
    photoURL: "",
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
      db.collection("users")
        .doc(state.uid)
        .update({
          sidebarOpen: state.sidebarActive
        });
    },
    setSidebarOpen(state, isOpen) {
      state.sidebarActive = isOpen;
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
