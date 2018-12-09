<template>
  <div id="app">
    <NavBar v-if="$route.name !== 'landing'" />
    <router-view />
  </div>
</template>


<script>
import NavBar from "@/components/NavBar";
import firebase from "./firebaseConfig";
export default {
  name: "App",
  components: {
    NavBar
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
@import "node_modules/spectre.css/src/spectre.scss";
@import "node_modules/spectre.css/src/spectre-icons.scss";
@import url("https://fonts.googleapis.com/css?family=Pacifico");
@import url("https://rsms.me/inter/inter-ui.css");

html,
body {
  min-height: 100vh;
  max-height: 100vh;
  background-color: #f7f8f9;
}

#app {
  font-family: "Inter UI", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
