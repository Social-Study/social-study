<template>
  <div class="createContent">
    <div
      v-if="active===0"
      class="infoContainer"
    >
      <h2>What is the name of the class?</h2>
      <el-input
        @keydown.enter.native="next"
        placeholder="Class Name"
        v-model="className"
        clearable
      >
      </el-input>
    </div>
    <div
      class="infoContainer"
      v-else-if="active===1"
    >
      <h2>What is the course intructor's name?</h2>
      <el-input
        @keydown.enter.native="next"
        placeholder="Instructor Name"
        v-model="instructorName"
        clearable
      >
      </el-input>
    </div>
    <div
      class="infoContainer"
      v-else-if="active===2"
    >
      <h2>When does your class meet?</h2>
      <el-checkbox-group v-model="meetingDays">
        <el-checkbox-button
          v-for="(day, index) in days"
          :label="day"
          :key="index"
        >{{day}}</el-checkbox-button>
      </el-checkbox-group>
      <br>
      <el-time-picker
        style="margin-top: 20px;"
        format="hh:mm:A"
        is-range
        arrow-control
        v-model="meetingTime"
        range-separator="-"
        start-placeholder="Start time"
        end-placeholder="End time"
      >
      </el-time-picker>
    </div>

    <div
      class="infoContainer"
      v-else-if="active===3"
    >
      <h2>Where does the class meet?</h2>
      <el-input
        @keydown.enter.native="next"
        placeholder="Location"
        v-model="location"
        clearable
      >
      </el-input>
    </div>

    <div
      class="infoContainer"
      v-else-if="active===4"
    >
      <h2>Does your professor have a website?</h2>
      <el-switch
        v-model="hasWebsite"
        active-text="Yes"
        inactive-text="No"
        active-color="#13ce66"
      >
      </el-switch>
      <br>
      <transition name="el-zoom-in-top">
        <el-input
          style="margin-top: 12px;"
          v-show="hasWebsite"
          @keydown.enter.native="next"
          placeholder="Website URL"
          v-model="websiteURL"
          clearable
        >
        </el-input>
      </transition>
    </div>

    <div
      class="infoContainer"
      v-else-if="active===5"
    >
      <h2>Would you like to enter any additional information?</h2>
      <el-switch
        v-model="hasExtraInfo"
        active-text="Yes"
        inactive-text="No"
        active-color="#13ce66"
      >
      </el-switch>
      <br>
      <transition name="el-zoom-in-top">
        <el-input
          style="margin-top: 12px;"
          v-show="hasExtraInfo"
          @keydown.ctrl.enter.native="next"
          type="textarea"
          :rows="4"
          resize="none"
          placeholder="Additional Class Info"
          v-model="extraInfo"
        >
        </el-input>
      </transition>
    </div>

    <div
      class="infoContainer"
      v-else-if="active===6"
    >
      <el-button
        @click="createStudyGroup"
        class="createBtn"
      >
        Create Study Group
      </el-button>
    </div>

    <!-- <div class="buttonContainer">
      <el-button
        style="margin-top: 12px;"
        icon="el-icon-arrow-left"
        @click="back"
      ></el-button>
      <el-button
        type="success"
        style="margin-top: 12px;"
        icon="el-icon-arrow-right"
        @click="next"
      ></el-button>
    </div> -->

    <el-steps
      :active="active"
      finish-status="success"
      simple
    >
      <el-step
        @click.native="active = 0"
        title="Step 1"
      ></el-step>
      <el-step
        @click.native="active = 1"
        title="Step 2"
      ></el-step>
      <el-step
        @click.native="active = 2"
        title="Step 3"
      ></el-step>
      <el-step
        @click.native="active = 3"
        title="Step 4"
      ></el-step>
      <el-step
        @click.native="active = 4"
        title="Step 5"
      ></el-step>
      <el-step
        @click.native="active = 5"
        title="Step 6"
      ></el-step>
      <el-step
        @click.native="active = 6"
        title="Finalize"
      ></el-step>
    </el-steps>

  </div>
</template>

<script>
import firebase, { db } from "../firebaseConfig";

export default {
  name: "CreateGroup",
  data() {
    return {
      active: 0,
      className: "",
      instructorName: "",
      location: "",
      hasWebsite: false,
      websiteURL: "",
      hasExtraInfo: false,
      extraInfo: "",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      meetingDays: [],
      meetingTime: [new Date(), new Date()]
    };
  },
  methods: {
    next() {
      this.active++;
    },
    back() {
      if (this.active !== 0) {
        this.active--;
      }
    },
    createStudyGroup() {
      // Create new study group in the firestore
      db.collection("study-groups")
        .add({
          className: this.className,
          instructorName: this.instructorName,
          meetingDays: this.meetingDays,
          meetingTime: this.meetingTime,
          location: this.location,
          websiteURL: this.websiteURL,
          extraInfo: this.extraInfo,
          owner: firebase.auth().currentUser.uid,
          members: [firebase.auth().currentUser.uid]
        })
        .then(docRef => {
          this.$router.push({ path: `/${docRef.id}/home` });
        })
        .catch(erorr => {
          console.log("Error creating new Study Group");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styleVariables.scss";
.createContent {
  min-height: 100vh;
  background-image: $green-gradient;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.infoContainer {
  min-height: 300px;
}

.createBtn {
  background-image: $sunset-gradient;
  width: 300px;
  padding: 20px;
  font-family: "Pacifico", cursive;
  font-size: 30px;

  &:hover {
    color: white;
  }
}

.el-input {
  width: 60%;
}

.el-textarea {
  width: 80%;
}

.el-step {
  cursor: pointer;
}

// .el-switch {
//   padding: 50px;
// }

.buttonContainer {
  display: block;
}
.el-steps {
  // background-color: rgba(0, 0, 0, 0);
  box-shadow: rgba(36, 37, 38, 0.13) 5px 12px 20px;
  position: fixed;
  bottom: 0;
  padding-left: 15px;
  padding-right: 15px;
  margin: 30px auto;
  width: 80%;
}
</style>
