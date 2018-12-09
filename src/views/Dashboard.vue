<template>

  <!-- TODO: Render loading indicator if firebase has not finished async load -->
  <div v-if="this.user !== null">
    <!-- <NavBar :user="user" /> -->

    <!-- TODO: Create a flexbox? -->
    <div class="dashboardBody">
      <div class="empty">
        <div class="empty-icon">
          <img
            id="undraw"
            class="undraw-svg"
            src="../assets/undraw_no_data.svg"
            alt="No Study Groups"
          >
        </div>
        <p
          v-if="this.studyGroups.length === 0"
          class="empty-title h5"
        >You don't have any Study Groups!</p>
        <p class="empty-subtitle">Create a brand new Study Group</p>
        <div class="empty-action">
          <button
            @click="$router.push('/dashboard/create')"
            class="btn btn-primary"
          >Create</button>
        </div>
        <p class="empty-subtitle">or</p>
        <p class="empty-subtitle ">Join an existing Study Group.</p>
        <div class="empty-action input-group input-inline">
          <input
            class="form-input"
            type="text"
          >
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
import firebase, { db } from "@/firebaseConfig";

export default {
  name: "dashboard",
  data: function() {
    return {
      user: null,
      query: null,
      studyGroups: []
    };
  },
  methods: {},
  created() {
    // Set local user variable to the user's account information.
    // Display loading indicator when not available or loading
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        this.$bind(
          "studyGroups",
          db
            .collection("study-groups")
            .where("members", "array-contains", this.$store.getters.uid)
        ).then(studyGroups => {
          this.studyGroups === studyGroups;
          // this.$unbind("todos");
        });
      } else {
        this.user = null;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.dashboardBody {
  min-height: 94vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#undraw {
  width: 10em;
}
</style>
