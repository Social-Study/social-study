<!-- SCI ID: 006 -->
<!-- Name: Dashboard -->
<!-- Version: 1.1 -->
<template>
  <div
    v-if="user !== null"
    id="full-screen"
  >
        <div class="welcome-msg">
          Hello, 
          <span>{{ user.displayName }}.</span>
          <p id="date">it is {{new Date().getMonth() + 1 }}/{{ new Date().getDate()}}/{{new Date().getFullYear()}}</p> 
        </div>
    <!-- Centered Empty Dashboard Placeholder -->
    <div v-if="studyGroups && studyGroups.length > 0">
          <p id="group-header">Your Study Groups</p>
          <div class="studyGroups">
            <router-link class="group-card"  
              :to="{ name: 'home', params: { groupID: group.id } }"
              v-for="(group, index) in studyGroups"
              :key="index"
            >
              <div id="name">{{group.className}}</div>
              <div id="professor">{{group.instructorName}}</div>
            </router-link>
          </div>
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
  margin: 20px;
  span{
    color: white;
  }

  #date{
    font-size: 75%;
    font-family: $secondary-font;
  }
}

#undraw {
  width: 10em;
}

#full-screen {
  height: $content-height;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: space-between;
  background-image: $dashboard-gradient;
  color: $secondary-light;
}

.empty {
  background-color: transparent;
}

.studyGroups{
  display:flex;
  flex-direction: row;
  width: 50%;
  margin: auto;
  align-items: center;
  justify-content: center;
}

.group-card{
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  color: $dark;
  padding: 10px;
  box-shadow: $shadow;
  margin: 10px;
  min-width: 250px;
  height: 150px;
  text-align: center;
  text-decoration: none;

  #name{
    font-weight: bold;
    font-size: 125%;
    margin: 0px;
    padding: 0px;
  }

  #professor{
    font-family: $secondary-font;
    font-size: 100%;
  }

  &:hover{
    box-shadow: $shadow-heavy;
  }
}

#group-header{
  padding-top: 100px;
  font-size: 50px;
}
</style>
