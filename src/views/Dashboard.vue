<template>

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

#undraw {
  width: 10em;
}

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
  min-height: 92vh;
  // min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
