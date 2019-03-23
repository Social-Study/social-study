<template>
  <div id="full-screen">
    <!-- Page Title -->
    <page-title>
      <template slot="center">Create New Study Group</template>
    </page-title>

    <!-- Notification -->
    <notifications
      group="create"
      position="right bottom"
    />

    <div class="create-content">
      <!-- Contains Center Content; Buttons and Content -->
      <div class="nav-container">

        <!-- Back Button -->
        <button
          class="btn btn-action btn-success btn-lg"
          :class="active === 0 ? 'disabled c-not-allowed' : ''"
          @click="back"
        >
          <i class="fas fa-arrow-left"></i>
        </button>

        <!-- Class Name Card -->
        <div
          v-if="active === 0"
          class="infoContainer"
        >
          <h2>What is the name of the class?</h2>

          <div
            class="form-group"
            :class="
              errors.first('className')
                ? 'has-error'
                : '' || (!errors.first('className') && className)
                ? 'has-success'
                : ''
            "
          >
            <input
              v-model="className"
              v-validate="'required'"
              class="form-input"
              type="text"
              placeholder="Class Name"
              name="className"
              @keydown.enter="next"
              required
            />
            <p class="form-input-hint">{{ errors.first("className") }}</p>
          </div>
          <!-- <span style="color: red;">{{ errors.first("className") }}</span> -->
          <h3 style="margin-top: 20px;">Course Code? (Optional)</h3>
          <input
            v-model="courseCode"
            class="form-input"
            type="text"
            style="width: 200px;"
            placeholder="Course Code "
            @keydown.enter="next"
          />
        </div>

        <!-- Instructor Name Form -->
        <div
          v-else-if="active === 1"
          class="infoContainer"
        >
          <!-- TODO: Figure out why validation isn't working... -->
          <h2>What is the course intructor's name?</h2>
          <div
            class="form-group"
            :class="
              errors.first('instructorName')
                ? 'has-error'
                : '' || (!errors.first('instructorName') && instructorName)
                ? 'has-success'
                : ''
            "
          >
            <input
              v-model="instructorName"
              v-validate="'required|alpha_spaces'"
              class="form-input"
              type="text"
              placeholder="Instructor Name"
              name="instructor"
              required
              @keydown.enter="next"
            />
            <p class="form-input-hint">{{ errors.first("instructorName") }}</p>
          </div>
        </div>

        <!-- Class Meeting Time Form -->
        <div
          v-else-if="active === 2"
          class="infoContainer"
        >
          <h2>When does your class meet?</h2>

          <!-- Day Selector Button Block -->
          <div class="btn-group btn-group-block">
            <button
              :class="meetingDays.monday ? 'active' : ''"
              class="btn"
              @click="toggle('monday')"
            >
              Monday
            </button>
            <button
              :class="meetingDays.tuesday ? 'active' : ''"
              class="btn"
              @click="toggle('tuesday')"
            >
              Tuesday
            </button>
            <button
              :class="meetingDays.wednesday ? 'active' : ''"
              class="btn"
              @click="toggle('wednesday')"
            >
              Wednesday
            </button>
            <button
              :class="meetingDays.thursday ? 'active' : ''"
              class="btn"
              @click="toggle('thursday')"
            >
              Thursday
            </button>
            <button
              :class="meetingDays.friday ? 'active' : ''"
              class="btn"
              @click="toggle('friday')"
            >
              Friday
            </button>
          </div>

          <br />
          <!-- TODO: Transition to use new flatpickr -->
          <div class="time-group">
            <flat-pickr
              :config="config"
              class="time-picker form-input"
              v-model="meetingTime[0]"
              style="margin-right: 10px;"
              placeholder="Time"
              required
            />
            <p>to</p>
            <flat-pickr
              :config="config"
              class="time-picker form-input"
              v-model="meetingTime[1]"
              style="margin-left: 10px;"
              placeholder="Time"
              required
            />
          </div>
        </div>

        <!-- Class Meeting Location Form -->
        <div
          v-else-if="active === 3"
          class="infoContainer"
        >
          <h2>Where does the class meet?</h2>

          <input
            v-model="location"
            v-validate="'required'"
            class="form-input"
            style="width: 60%;"
            type="text"
            name="location"
            placeholder="Class Location"
            @keydown.enter="next"
          />
          <span style="color: red;">{{ errors.first("location") }}</span>
        </div>

        <!-- Instructor Website Form -->
        <div
          v-else-if="active === 4"
          class="infoContainer"
        >
          <h2>Does your instructor have a website?</h2>

          <div class="form-group switch">
            <label class="form-switch">
              <input
                v-model="hasWebsite"
                type="checkbox"
              />
              <i class="form-icon"></i>
            </label>
          </div>
          <br />
          <transition-group
            name="transition"
            enter-active-class="animated fadeInDown"
            leave-active-class="animated fadeOutUp"
          >
            <div
              v-show="hasWebsite"
              key="input"
              class="input-group"
            >
              <span class="input-group-addon">https://</span>
              <input
                v-model="websiteURL"
                v-validate="'url'"
                style="margin: 0;"
                class="form-input"
                type="text"
                name="url"
                placeholder="Website URL"
                @keydown.enter="next"
              />
            </div>
            <span
              key="error-string"
              style="color: red;"
            >{{
              errors.first("url")
              }}</span>

            <br key="break" />
            <br key="break2" />
            <a
              v-show="hasWebsite && websiteURL !== ''"
              key="link"
              target="_blank"
              :href="formattedURL"
            >{{ formattedURL }}</a>
          </transition-group>
        </div>

        <!-- Extra Group Info Form -->
        <div
          v-else-if="active === 5"
          class="infoContainer"
        >
          <h2>Would you like to enter any additional information?</h2>
          <div class="form-group switch">
            <label class="form-switch">
              <input
                v-model="hasExtraInfo"
                type="checkbox"
              />
              <i class="form-icon"></i>
            </label>
          </div>
          <br />
          <div
            v-show="hasExtraInfo"
            key="input"
            class="input-group"
          >
            <transition
              name="transition"
              enter-active-class="animated fadeInDown"
              leave-active-class="animated fadeOutUp"
            >
              <textarea
                v-show="hasExtraInfo"
                v-model="extraInfo"
                style="resize: none"
                class="form-input"
                type="text-area"
                cols="53"
                rows="3"
                placeholder="Additional Class Info"
                @keydown.enter="next"
              ></textarea>
            </transition>
          </div>
        </div>

        <!-- Create Group with previous data confirmation -->
        <div
          v-else-if="active === 6"
          class="infoContainer"
        >
          <button
            class="createBtn"
            @click="createStudyGroup"
          >
            Create Study Group
          </button>
        </div>

        <!-- Invite Code / New Group Links -->
        <div
          v-else-if="active === 7"
          class="infoContainer"
        >
          <h3>Your new Study Group has been created!</h3>
          <div
            style="width: 50%; margin: 20px auto;"
            class="input-group"
          >
            <input
              ref="inviteDisplay"
              v-model="inviteCode"
              type="text"
              class="form-input"
              placeholder="Invite Code"
              style="margin: 0;"
            />
            <button
              class="btn btn-primary input-group-btn"
              @click="copyCode"
            >
              Copy Code
            </button>
          </div>
          <div id="btnContainer">
            <router-link
              class="btn"
              :to="{ name: 'dashboard' }"
            >Dashboard</router-link>
            <router-link
              style="margin: 0px 10px;"
              class="btn btn-success"
              :to="{ name: 'home', params: { groupID: newGroupID } }"
            >Go to Group</router-link>
          </div>
        </div>

        <!-- Next Button -->
        <button
          class="btn btn-action btn-success btn-lg"
          :class="active === 7 ? 'disabled' : ''"
          @click="next"
        >
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>

      <steps :active="active" />
    </div>
  </div>
</template>

<script>
import firebase, { db } from "@/firebaseConfig";
import generateCode from "@/scripts/generateCode";
import PageTitle from "@/components/navigation/PageTitle";
import Steps from "@/components/create/Steps";

import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import ConfirmDatePlugin from "flatpickr/dist/plugins/confirmDate/confirmDate.js";
import "flatpickr/dist/plugins/confirmDate/confirmDate.css";

export default {
  name: "CreateGroup",
  components: {
    PageTitle,
    flatPickr,
    Steps
  },
  data() {
    // TODO: refactor these into objects
    // TODO: Finish updating validation...
    return {
      active: 0,
      config: {
        dateFormat: "h:i K",
        enableTime: true,
        noCalendar: true,
        plugins: [new ConfirmDatePlugin()]
      },
      className: "",
      courseCode: "",
      instructorName: "",
      location: "",
      hasWebsite: false,
      websiteURL: "",
      hasExtraInfo: false,
      extraInfo: "",
      meetingDays: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false
      },
      meetingTime: [new Date(), new Date()],
      inviteCode: "",
      newGroupID: ""
    };
  },
  computed: {
    formattedURL() {
      return "https://" + this.websiteURL;
    }
  },
  methods: {
    toggle(key) {
      this.meetingDays[key] = !this.meetingDays[key];
    },
    next() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.active++;
        } else {
          this.$notify({
            group: "create",
            type: "error",
            title: "Validation Errors!",
            text: "All errors must be corrected."
          });
        }
      });
    },
    back() {
      this.$validator.validateAll().then(result => {
        if (result && this.active !== 0) {
          this.active--;
        } else {
          this.$notify({
            group: "create",
            type: "error",
            title: "Validation Errors!",
            text: "All errors must be corrected."
          });
        }
      });
    },
    copyCode() {
      // Allows user to copy the invite code on button click
      this.$refs.inviteDisplay.select();
      document.execCommand("copy");
    },
    getDaysArray() {
      let arr = [];
      Object.keys(this.meetingDays).forEach(key => {
        if (this.meetingDays[key] === true) {
          arr.push(key.charAt(0).toUpperCase() + key.slice(1));
        }
      });
      return arr;
    },
    createStudyGroup() {
      // Generate random invite code and save it
      this.inviteCode = generateCode();
      // Create new study group in the firestore
      db.collection("study-groups")
        .add({
          className: this.className,
          courseCode: this.courseCode,
          instructorName: this.instructorName,
          meetingDays: this.getDaysArray(),
          meetingTime: this.meetingTime,
          location: this.location,
          // Check to see if it is just the prepend or the actual url
          websiteURL:
            this.websiteURL === "" ? "" : "https://" + this.websiteURL,
          extraInfo: this.extraInfo,
          owner: firebase.auth().currentUser.uid,
          members: [firebase.auth().currentUser.uid],
          inviteCodes: [this.inviteCode]
        })
        .then(docRef => {
          this.newGroupID = docRef.id;
          this.next();
        })
        // Catch error when creating Study Group
        .catch(error => {
          // console.log("CreateGroup: " + error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";

#full-screen {
  height: $content-height;
}

button.btn-action {
  margin: 15px;
}

// Main container, centers all content on the page
.create-content {
  height: $page-with-header-height;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

// Aligns the card into a row between the two traversal buttons.
.nav-container {
  display: flex;
  flex-flow: row nowrap;
  place-content: center;
  justify-content: center;
  align-items: center;
}

.infoContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 20px;
  min-height: 400px;
  width: 800px;
  background-color: rgb(255, 255, 255);
  border: 2px solid $secondary-light;

  &:hover {
    border-image: $orange-gradient;
    border-image-slice: 1;
    border-width: 2px;
    box-shadow: $shadow-hovered;
  }
}

.createBtn {
  cursor: pointer;
  background-image: $orange-gradient;
  width: 300px;
  padding: 20px;
  font-family: $logo-font;
  font-size: 30px;
  color: white;
  border: 0;

  &:hover {
    box-shadow: $shadow-heavy;
  }
}

.time-group {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}

.time-picker {
  width: 100px;
}

input {
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
  // width: 60%;
}

p {
  margin: 0;
  margin-top: 10px;
}

textarea {
  width: 60%;
}

.arrow-buttons {
  margin: 20px;
}

.blocked {
  cursor: not-allowed !important;
}

.switch {
  margin: 0 auto 20px auto;
  width: 50px;
}
</style>
