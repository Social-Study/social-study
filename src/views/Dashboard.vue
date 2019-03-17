<template>
  <div id="full-screen" v-if="this.user !== null">
    <!-- Centered Empty Dashboard Placeholder -->
    <div>
      <div class="empty">
        <div class="empty-icon">
          <img
            id="undraw"
            class="undraw-svg"
            src="../assets/undraw_no_data.svg"
            alt="No Study Groups"
          />
        </div>
        <p
          v-if="this.studyGroups && this.studyGroups.length === 0"
          class="empty-title h5"
        >
          You don't have any Study Groups!
        </p>
        <p class="empty-subtitle text-large text-bold">
          Welcome to your Dashboard
        </p>
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
      // Catch error when loading user's account data
      .catch(error => {
        // console.log(error);
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
@import "../styles.scss";

#undraw {
  width: 10em;
}

#full-screen {
  height: $content-height;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

.empty {
  background-color: $light;
}

.modal-container {
  border-radius: 10px;
}

.modal-btn {
  margin: 4px;
  min-width: 80px;
}
</style>
