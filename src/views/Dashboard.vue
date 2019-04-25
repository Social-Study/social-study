<!-- SCI ID: 006 -->
<!-- Name: Dashboard -->
<!-- Version: 1.1 -->
<template>
  <div
    v-if="user !== null"
    id="full-screen"
  >
    <!-- Centered Empty Dashboard Placeholder -->
    <div>
      <p class="welcome-msg">
          Hello, 
          <span>{{ user.displayName }}</span>
          <p> 
            it is {{new Date().getMonth()}} / {{ new Date().getDate()}} / {{new Date().getFullYear()}} 

          </P>
      </p>
      <div class="empty">
        <div class="empty-icon">
        </div>
        <p
          v-if="studyGroups && studyGroups.length === 0"
          class="empty-title h5"
        >
          You don't have any Study Groups!
        </p>
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
  name: "Dashboard",
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


.welcome-msg{
  font-size: 300%;

  span{
    color: $primary;
  }
}

#undraw {
  width: 10em;
}

#full-screen {
  height: $content-height;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: space-between;
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
