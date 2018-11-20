<template>

  <!-- TODO: Render loading indicator if firebase has not finished async load -->
  <div v-if="this.user !== null">
    <NavBar :user="user" />

    <div v-show="studyGroups === null">
      <!-- <h1>Welcome to Social Study, {{ user.displayName }}</h1> -->
      <div class="empty">
        <div class="empty-icon">
          <img id="undraw" class="undraw-svg" src="../assets/undraw_no_data.svg" alt="No Study Groups">
        </div>
        <p class="empty-title h5">You don't have any Study Groups!</p>
        <p class="empty-subtitle">Create a brand new Study Group</p>
        <div class="empty-action">
          <button class="btn btn-primary">Create</button>
        </div>
        <p class="empty-subtitle">or</p>
        <p class="empty-subtitle ">Join an existing Study Group.</p>
        <div class="empty-action input-group input-inline">
          <input class="form-input" type="text">
          <button class="btn btn-primary input-group-btn">Join</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    Loading info...
  </div>
</template>

<script>
import firebase from "@/firebaseConfig";
import NavBar from "@/components/NavBar";

// TODO: Figure out if we need to get the user from firebase on each view.
// May just be able to reference and set a single global variable.
// I think we should implement VUEX store to handle this. The user account is
// the most central part of the application
export default {
  name: "dashboard",
  components: {
    NavBar
  },
  data: function() {
    return {
      user: null,
      studyGroups: null
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
#undraw {
  width: 10em;
}

.empty {
  margin-top: 8%;
}
</style>
