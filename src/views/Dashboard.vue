<template>

  <!-- TODO: Render loading indicator if firebase has not finished async load -->
  <div v-if="this.user !== null">
    <notifications
      group="joinErrors"
      position="right top"
    />
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
          v-if="this.studyGroups && this.studyGroups.length === 0"
          class="empty-title h5"
        >You don't have any Study Groups!</p>
        <p class="empty-subtitle text-large text-bold">Welcome to your Dashboard</p>
        <p class="empty-subtitle">It is currently in development.</p>
        <!-- <p class="empty-subtitle">Create a brand new Study Group</p>
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
            v-model="inviteCode"
            class="form-input"
            type="text"
            @keydown.enter="queryStudyGroup"
          >
          <button
            @click="queryStudyGroup"
            class="btn btn-primary input-group-btn"
          >Join</button> -->
        <!-- </div> -->
      </div>
    </div>
  </div>
  <div v-else>
    <div class="loading loading-lg"></div>
  </div>
</template>

<script>
import { db } from "@/firebaseConfig";
import { getUserData } from "@/scripts/userFuncs";

export default {
  name: "dashboard",
  data() {
    return {
      user: null,
      // List user's study groups
      studyGroups: [],
      // The returned id of the group
      newGroupID: ""
    };
  },
  created() {
    // Load user data from firebase using the stored uid
    getUserData(this.$store.getters.uid)
      .then(user => {
        this.user = user;
      })
      .catch(error => {
        console.log(error);
      });

    // Get members list of joined study Groups
    this.$bind(
      "studyGroups",
      db
        .collection("study-groups")
        .where("members", "array-contains", this.$store.getters.uid)
    ).then(studyGroups => {
      this.studyGroups === studyGroups;
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../styleVariables.scss";

.empty {
  // background-color: $background-color;
  background-color: $light;
}

.modal-container {
  border-radius: 10px;
}

.modal-btn {
  margin: 4px;
  min-width: 80px;
}

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
