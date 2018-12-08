<template>
  <div>
    <div v-if="studyGroup.length !== 0">
      <h1>Home Page for {{ this.studyGroup.className }}</h1>
      <h3></h3>
    </div>
    <div v-else>
      Error Loading Your Study Group
    </div>

  </div>
</template>

<script>
import firebase, { db } from "../firebaseConfig";
export default {
  name: "GroupHomePage",
  data: function() {
    return {
      studyGroup: []
    };
  },
  firestore() {
    // studyGroup: db.collection("study-groups").doc(this.$route.params.groupID);
  },
  created() {
    // Load study group from the route params
    this.$bind(
      "studyGroup",
      db.collection("study-groups").doc(this.$route.params.groupID)
    ).then(studyGroup => {
      this.studyGroup === studyGroup;
    });
  }
};
</script>
