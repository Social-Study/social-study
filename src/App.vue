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
      console.log("app: user updated");
      this.user = user;
    });
  }
};
</script>


// Global Styles
<style lang="scss">
@import "node_modules/spectre.css/src/spectre.scss";
@import "node_modules/spectre.css/src/spectre-icons.scss";
@import "node_modules/spectre.css/src/spectre-exp.scss";
@import url("https://fonts.googleapis.com/css?family=Pacifico");
@import url("https://rsms.me/inter/inter-ui.css");

html,
body {
  min-height: 100vh;
  max-height: 100vh;
  // background-color: #f7f8f9;
  background-color: #f6f6f6;
}

#app {
  font-family: "Inter UI", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
// #nav {
//   padding: 30px;
//   a {
//     font-weight: bold;
//     color: #2c3e50;
//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
