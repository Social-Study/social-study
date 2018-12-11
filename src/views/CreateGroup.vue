<template>
  <div>
    <h1 class="pageTitle">Create a New Study Group</h1>
    <div class="createContent">

      <div class="navContainer">

        <button
          @click="back"
          class="btn btn-action btn-success btn-lg s-circle"
          :class="active===0 ?'disabled c-not-allowed' : '' "
        >
          <i class="icon icon-arrow-left"></i>
        </button>

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
          <h2>Does your instructor have a website?</h2>
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

        <button
          @click="next"
          class="btn btn-action btn-success btn-lg s-circle"
          :class="active===6 ?'disabled c-not-allowed' : '' "
        >
          <i class="icon icon-arrow-right"></i>
        </button>

        <!-- <el-button
          :disabled="active === 6"
          @click="next"
          type="danger"
          class="arrow-buttons"
          icon="el-icon-arrow-right"
          circle
        ></el-button> -->
      </div>

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
  </div>
</template>

<script>
import firebase, { db } from "../firebaseConfig";
import generateCode from "../scripts/generateCode";

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
          members: [firebase.auth().currentUser.uid],
          inviteCodes: [generateCode()]
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

button.s-circle {
  margin: 15px;
}

.pageTitle {
  position: fixed;
  width: 100%;
  margin-top: 50px;
  font-family: $logo-font;
  text-shadow: rgba(36, 37, 38, 0.13) 5px 12px 20px;
}

.createContent {
  min-height: 94vh;
  // background-image: $green-gradient;
  // background-color: #97d9e1;
  // TODO: Figure out good background color
  // background-color: grey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.navContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.infoContainer {
  padding: 20px;
  min-height: 225px;
  max-width: 800px;
  min-width: 800px;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  // border-radius: 16px;
  box-shadow: rgba(36, 37, 38, 0.13) 5px 12px 20px;
}

.createBtn {
  margin-top: 55px;
  background-image: $nav-gradient;
  width: 300px;
  padding: 20px;
  font-family: $logo-font;
  font-size: 30px;
  color: white;
  border-radius: 10px;

  &:hover {
    color: whitesmoke;
    box-shadow: rgba(36, 37, 38, 0.13) 5px 12px 20px;
  }
}

.el-input {
  margin-top: 15px;
  width: 60%;
}

.el-textarea {
  width: 80%;
}

.el-step {
  cursor: pointer;
}

.arrow-buttons {
  margin: 20px;
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
