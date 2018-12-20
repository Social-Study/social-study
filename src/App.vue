<template>
  <div id="app">
    <NavBar v-if="$route.name !== 'landing'" />
    <router-view v-if="!$route.params.groupID" />
    <side-bar v-else>
      <router-view :class="chatActive ? 'chat-active' : 'chat-inactive'" />
      <!-- <button
        class="btn btn-action s-circle"
        @click="isActive = !isActive"
      ><i class="icon icon-arrow-left"></i></button> -->
      <chat
        :show="chatActive"
        :user="user"
      />
    </side-bar>
  </div>
</template>


<script>
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import Chat from "@/components/Chat";

import { mapGetters } from "vuex";

import firebase from "./firebaseConfig";
export default {
  name: "App",
  components: {
    NavBar,
    SideBar,
    Chat
  },
  data() {
    return {
      user: null,
      isActive: true
    };
  },
  computed: {
    ...mapGetters(["chatActive"])
  },
  created() {
    // Keep track current logged in users
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        user = null;
      }
    });
  }
};
</script>


// Global Styles
<style lang="scss">
@import "./styleVariables.scss";
@import "node_modules/animate.css/animate";
@import "node_modules/spectre.css/src/spectre.scss";
@import "node_modules/spectre.css/src/spectre-icons.scss";
@import "node_modules/spectre.css/src/spectre-exp.scss";
@import url("https://fonts.googleapis.com/css?family=Pacifico");
@import url("https://rsms.me/inter/inter-ui.css");

html,
body {
  // min-height: 100vh;
  // max-height: 100vh;
  height: 100%;
  background-color: $background-color;
  overflow: hidden;
}

#app {
  font-family: "Inter UI", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

// Applies to all modal-overlays
a.modal-overlay {
  background-image: $dark-gradient !important;
}

.chat-active {
  margin-right: 300px;
  transition: 1s;
}

.chat-inactive {
  margin-right: 0px;
  transition: 1s;
  height: 100%;
}
</style>
