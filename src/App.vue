<template>
  <div id="app">
    <NavBar v-if="$route.name !== 'landing'" />
    <router-view v-if="!$route.params.groupID" />
    <side-bar v-else>
      <router-view />
    </side-bar>
  </div>
</template>


<script>
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import firebase from "./firebaseConfig";
export default {
  name: "App",
  components: {
    NavBar,
    SideBar
  },
  data() {
    return {
      user: null
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
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
  min-height: 100vh;
  max-height: 100vh;
  background-color: $background-color;
}

#app {
  font-family: "Inter UI", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

// Applies to all modal-overlays
a.modal-overlay {
  background-image: $dark-gradient !important;
}
</style>
