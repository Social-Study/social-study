<!-- SCI ID: 002 -->
<!-- Name: Landing -->
<!-- Version: 1.0 -->

<template>
  <div class="landing">
    <!-- Header Section -->
    <header class="navbar">
      <section class="navbar-section">
        <img
          src="../assets/icons/social_study_white.png"
          height="50px"
          width="50px"
          alt=""
        />
        <!-- <a
          href="#"
          class="navbar-brand m-2"
          :style="centerTitle"
        >Social Study</a> -->
      </section>

      <!-- Login Form -->
      <form
        class="hide-sm hide-xs navbar-section login-container form-group"
        method=""
        data-vv-scope="login"
        @submit.prevent
      >
        <input
          ref="email"
          v-model="email"
          v-validate.disable="'required|email'"
          name="email"
          placeholder="Email"
          type="text"
          class="form-input form-inline mx-1"
          autofocus
          autocomplete="off"
        />
        <input
          v-model="password"
          v-validate.disable="'required|min:6'"
          name="password"
          placeholder="Password"
          type="password"
          class="form-input form-inline mx-1"
          autocomplete="off"
        />
        <button
          id="loginButton"
          class="btn btn-primary m-1"
          @click="logIn"
        >Log In</button>
      </form>
      <!-- </section> -->
    </header>

    <!-- Sucess Message Display -->
    <transition
      name="transition"
      enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeOutRight"
    >
      <MessageBar
        v-show="message.show"
        type="success"
      >
        {{ message.message }}
      </MessageBar>
    </transition>

    <!-- Error Message Display -->
    <transition
      name="transition"
      enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeOutRight"
    >
      <MessageBar
        id="errorMessage"
        v-show="error.show"
        type="error"
        @closeMessage="error.show = false"
      >
        {{ error.message }}
        <a
          v-show="error.passPrompt"
          href="#"
          style="cursor: pointer"
          @click="modalActive = true"
        >Forgot Password?</a>
      </MessageBar>
    </transition>
    <!-- Password Reset Modal -->
    <div
      v-show="modalActive"
      id="modal-id"
      class="modal modal-sm active"
    >
      <a
        href="#"
        class="modal-overlay"
        aria-label="Close"
        @click="modalActive = false"
      ></a>
      <div class="modal-container">
        <div class="modal-header">
          <a
            href="#"
            class="btn btn-clear float-right"
            aria-label="Close"
            @click="modalActive = false"
          ></a>
          <div class="modal-title h5">Enter your email</div>
        </div>
        <div class="modal-body">
          <div class="content">
            <!-- TODO: Add vvalidate to this. May need to put inside form -->
            <input
              v-model="resetEmail"
              value="email"
              type="text"
              class="form-input"
              autofocus
              @focus="$event.target.select()"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-primary m-1"
            @click="sendResetEmail"
          >
            Reset
          </button>
        </div>
      </div>
    </div>

    <div class="columns body-container">
      <!-- Left Block: Information -->
      <div class="column col-6 col-md-12">
        <div style="margin-left: 20px; margin-right: 20px;">
          <h1
            id="logo"
            class="hide-sm hide-xs"
          >Social Study</h1>
          <p style="margin-top: 20px;">
            The <i>free</i> learning tool for all ages.
          </p>

          <div class="columns">
            <div
              class="col-4 col-md-6 col-sm-12 tooltip tooltip-bottom"
              data-tooltip="Create and study notes and flashcards"
            >
              <img
                class="img-responsive undraw-svg"
                src="../assets/undraw_studying.svg"
                alt="studying"
              />
            </div>
            <div
              class=" col-4 col-md-6 col-sm-12 tooltip tooltip-bottom"
              data-tooltip="Take practice quizzes"
            >
              <img
                class="img-responsive  undraw-svg"
                src="../assets/undraw_exams.svg"
                alt="quizzes"
              />
            </div>
            <div
              class="col-4 col-md-6 col-sm-12 tooltip tooltip-bottom"
              data-tooltip="Take notes and keep them organized"
            >
              <img
                class="img-responsive  undraw-svg"
                src="../assets/undraw_taking_notes.svg"
                alt="note taking"
              />
            </div>
            <div
              class="col-4 col-md-6 col-sm-12 tooltip tooltip-bottom"
              data-tooltip="Create and manage events and assignments"
            >
              <img
                class="img-responsive  undraw-svg"
                src="../assets/undraw_events.svg"
                alt="schedule management"
              />
            </div>
            <div
              class="col-4 col-md-6 col-sm-12 tooltip tooltip-bottom"
              data-tooltip="Communicate with classmates"
            >
              <img
                class="img-responsive  undraw-svg"
                src="../assets/undraw_group_chat.svg"
                alt="communication"
              />
            </div>
            <div
              class="col-4 col-md-6 col-sm-12 tooltip tooltip-bottom"
              data-tooltip="Improve your academic success!"
            >
              <img
                class="img-responsive  undraw-svg"
                src="../assets/undraw_grad.svg"
                alt="success"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Right Block: Sign Up Form -->
      <div
        class="column col-6 col-sm-12 col-md-12 hide-xs hide-sm"
        style="margin-bottom: 30px;"
      >
        <div id="right-container form-group">
          <form
            data-vv-scope="signup"
            @submit.prevent
          >
            <h1 style="margin-top: 40px;">Sign Up</h1>
            <span id="name-container">
              <input
                v-model.trim="firstName"
                v-validate.disable="'required|alpha'"
                class="form-input"
                type="text"
                name="firstname"
                placeholder="First Name"
              />
              <input
                v-model.trim="lastName"
                v-validate.disable="'required|alpha'"
                class="form-input"
                type="text"
                name="lastname"
                placeholder="Last Name"
              />
            </span>
            <br />
            <input
              v-model="newEmail"
              v-validate.disable="'required|email'"
              type="text"
              class="form-input"
              name="email"
              placeholder="Email Address"
            /><br />
            <input
              v-model="newPassword"
              v-validate.disable="'required|min:6'"
              class="form-input"
              type="password"
              name="password"
              placeholder="Password"
            /><br />
            <button
              class="btn btn-primary mx-1"
              @click="createAccount"
            >
              Sign Up
            </button>
            <button
              class="btn mx-1"
              @click="googleSignIn"
            >
              <i class="fab fa-google"></i>
              Sign in with Google
            </button>
          </form>
        </div>
      </div>
    </div>

    <div
      class="show-xs show-sm"
      style="margin-top: 80px;"
    >
      <p>Unfortunately, <i>Social Study</i> is only available on desktop.</p>
      <p>To sign up, please visit the site on your desktop!</p>
    </div>
  </div>
</template>

<script>
import firebase, { db, FirebaseConsts } from "@/firebaseConfig";
import MessageBar from "@/components/MessageBar";

export default {
  name: "Landing",
  components: {
    MessageBar
  },
  data() {
    return {
      // user: null,
      // Login Variables
      email: "",
      password: "",
      // New Account Variables
      firstName: "",
      lastName: "",
      newEmail: "",
      newPassword: "",
      // Reset Email Form Variable
      resetEmail: "",
      // Error Message Popup
      error: {
        show: false,
        message: "",
        // Should message contain password reset prompt?
        passPrompt: false
      },
      // Generic Message Popup
      message: {
        show: false,
        message: ""
      },
      modalActive: false
    };
  },
  computed: {
    // Only runs on page reload. Used to center logo on mobile
    centerTitle() {
      if (window.innerWidth <= 600) {
        return { width: "100%" };
      }
      return {};
    }
  },
  methods: {
    logIn() {
      // Attempt to log in
      this.$validator.validateAll("login").then(result => {
        if (!result) {
          // there is a validation error, display them in order
          if (this.errors.has("login.email")) {
            this.error.message = this.errors.first("login.email");
          } else if (this.errors.first("login.password")) {
            this.error.message = this.errors.first("login.password");
          }
          this.error.show = true;
          this.error.passPrompt = true;
        } else {
          firebase
            .auth()
            .setPersistence(FirebaseConsts.auth.Auth.Persistence.LOCAL)
            .then(() => {
              firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(user => {
                  this.$store.commit("setUID", user.user.uid);
                  this.$router.replace("dashboard");
                })
                .catch(error => {
                  this.error.show = true;
                  this.error.passPrompt = true;
                  this.error.message = error.message;
                });
            })
            .catch(error => {
              this.error.show = true;
              this.error.passPrompt = true;
              this.error.message = error.message;
            });
        }
      });
    },
    createAccount() {
      // Attempt to create an account
      this.$validator.validateAll("signup").then(result => {
        if (!result) {
          if (this.errors.first("signup.firstname")) {
            this.error.message = this.errors.first("signup.firstname");
          } else if (this.errors.first("signup.lastname")) {
            this.error.message = this.errors.first("signup.lastname");
          } else if (this.errors.first("signup.email")) {
            this.error.message = this.errors.first("signup.email");
          } else if (this.errors.first("signup.password")) {
            this.error.message = this.errors.first("signup.password");
          }
          this.error.show = true;
          this.error.passPrompt = false;
        } else {
          firebase
            .auth()
            .setPersistence(FirebaseConsts.auth.Auth.Persistence.LOCAL)
            .then(() => {
              var fullName = this.firstName + " " + this.lastName;
              firebase
                .auth()
                .createUserWithEmailAndPassword(this.newEmail, this.newPassword)
                .then(authUser => {
                  authUser.user
                    .updateProfile({
                      displayName: fullName //pass displayName from form
                    })
                    .then(() => {
                      //redirect to the dashboard
                      this.newUserToStore(authUser.user);
                      this.$router.replace("dashboard");
                    })
                    .catch(error => {
                      this.error.show = true;
                      this.error.passPrompt = false;
                      this.error.message = error.message;
                    });
                  // }
                })
                .catch(error => {
                  this.error.show = true;
                  this.error.passPrompt = false;
                  this.error.message = error.message;
                });
            });
        }
      });
    },
    googleSignIn() {
      let provider = new FirebaseConsts.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        // .signInWithRedirect(provider)
        .then(result => {
          if (result.user) {
            this.newUserToStore(result.user);
            this.$router.replace("dashboard");
          }
        })
        .catch(error => {
          this.error.show = true;
          this.error.passPrompt = false;
          this.error.message = error.message;
        });
    },
    sendResetEmail() {
      this.error.show = false;
      this.modalActive = false;
      firebase
        .auth()
        .sendPasswordResetEmail(this.resetEmail)
        .then(() => {
          this.message.show = true;
          this.message.message =
            "Email with password reset instructions has been sent to  " +
            this.resetEmail;
        })
        .catch(error => {
          this.error.show = true;
          this.error.passPrompt = false;
          this.error.message = error.message;
        });
    },
    newUserToStore(userAccount) {
      db.collection("users")
        .doc(userAccount.uid)
        .set({
          uid: userAccount.uid,
          displayName: userAccount.displayName,
          photoURL: userAccount.photoURL,
          description: null,
          studyGroups: [],
          sidebarOpen: true
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";
h1 {
  font-size: 4em;
}
p {
  font-size: 1.5em;
}

div.tooltip {
  margin-bottom: 20px;
}

// Images should be centered in their column
.undraw-svg {
  width: 12em;
  margin: auto;
}

// Enlarges images on hober
.undraw-svg:hover {
  transform: scale(1.25);
  top: 5px;
  z-index: 28;
}

// Aligns all content vertically on the screen
.body-container {
  min-height: 92vh;
  display: flex;
  flex: row;
  justify-content: center;
  align-content: center;
  align-items: center;
}

// Signup form input box widths
.column input {
  width: 25em;
  margin: auto;
}

// Right signup information should be centered vertically and horizontally
#right-container {
  display: flex;
  flex-direction: col;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

// Two name input boxes should be inline with each other
#name-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 25em;
  margin: auto;
}

// Input boxes should have small gap between them
#name-container input {
  width: 48%;
  margin: 0;
}

// Set navbar color to main gradient
.navbar {
  background-color: $dark;
  padding: 0px 10px;
  height: 64px;
}

// Set login input form widths
.navbar-section input {
  width: 35%;
}

.navbar-brand {
  font-family: "Pacifico", cursive;
  font-size: 2em;
  color: white;
}

#logo {
  font-family: "Pacifico", cursive;
  font-size: 6vw;
  font-size: 100px;
}
</style>
