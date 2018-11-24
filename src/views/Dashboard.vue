<template>

  <!-- TODO: Render loading indicator if firebase has not finished async load -->
  <div v-if="this.user !== null">
    <NavBar :user="user" />

    <!-- TODO: Create a flexbox? -->
    <div class="dashboardBody">
      <div v-if="this.studyGroups.length <= 0" class="empty">
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
      <div v-else>
        <ol>
          <li v-for="(group, index) in studyGroups" :key="index">
            <h1>{{ group }}</h1>
          </li>
        </ol>
      </div>
    </div>
  </div>
  <div v-else>
    Loading info...
  </div>
</template>

<script>
import firebase, { db } from "@/firebaseConfig";
import NavBar from "@/components/NavBar";

export default {
  name: "dashboard",
  components: {
    NavBar
  },
  data: function() {
    return {
      user: null,
      query: null,
      studyGroups: []
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
  beforeMount() {
    if (this.user) {
      this.$bind(
        "studyGroups",
        db
          .collection("study-groups")
          .where("members", "array-contains", this.user.uid)
      ).then(() => {
        console.log(studyGroups);
      });
    }
    // this.query = db
    //   .collection("study-groups")
    //   .where("members", "array-contains", this.user.uid);
  },
  beforeUpdate() {
    // db.collection("study-groups")
    //   .where("members", "array-contains", this.user.uid)
    //   .get()
    //   .then(querySnapshot => {
    //     querySnapshot.forEach(doc => {
    //       this.studyGroups.push(doc.data());
    //     });
    //   });
    db.collection("study-groups")
      .where("members", "array-contains", this.user.uid)
      .get()
      .then(querySnapshot => {
        // this.studyGroups = querySnapshot.docs[0];
        console.log(querySnapshot.docs[0].data().courseCode);
        this.studyGroups[
          this.studyGroups.length
        ] = querySnapshot.docs[0].data().courseCode;
      });
    console.log(this.studyGroups.length);
  }
};
</script>

<style lang="scss" scoped>
#undraw {
  width: 10em;
}
</style>
