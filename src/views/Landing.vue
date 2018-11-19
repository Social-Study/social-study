<template>
  <div class="landing">

    <!-- Header Section -->
    <header class="navbar">
      <section class="navbar-section">
        <a href="#" class="navbar-brand m-2">Social Study</a>
      </section>

      <!-- Login Form -->
      <form class="hide-sm hide-xs navbar-section login-container" @submit.prevent method="" data-vv-scope="login">
        <input v-validate.disable="'required|email'" name="email" ref="email" v-model="email" placeholder="Email" type="text" id="" class="form-input mx-1" autofocus>
        <input v-validate.disable="'required|min:6'" name="password" v-model="password" placeholder="Password" type="password" id="" class="form-input mx-1">
        <button @click="logIn" class="btn btn-primary m-1">Log In</button>
      </form>
    </header>

    <!-- TODO: Figure out how to prevent page from getting longer when messages are active. Want to prevent scrollbar from appearing-->

    <!-- Sucess Message Display -->
    <MessageBar v-show="message.show" type="success">
      {{ this.message.message }}
    </MessageBar>

    <!-- Error Message Display -->
    <MessageBar @closeMessage="error.show=false" v-show="error.show" type="error">
      {{ this.error.message }}
      <a v-show="error.passPrompt" href="#" style="cursor: pointer" @click="modalActive = true">Forgot Password?</a>
    </MessageBar>

    <!-- Password Reset Modal -->
    <div v-show="modalActive" class="modal modal-sm active" id="modal-id">
      <a href="#" class="modal-overlay" aria-label="Close"></a>
      <div class="modal-container">
        <div class="modal-header">
          <a href="#" @click="modalActive = false" class="btn btn-clear float-right" aria-label="Close"></a>
          <div class="modal-title h5">Enter your email</div>
        </div>
        <div class="modal-body">
          <div class="content">
            <!-- TODO: Add vvalidate to this. May need to put inside form -->
            <input @focus="$event.target.select()" value="email" v-model="resetEmail" type="text" class="form-input" autofocus>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="sendResetEmail" class="btn btn-primary m-1">Reset</button>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="columns">

        <!-- Left Block: Information -->
        <div class="column col-6 col-md-12">

          <div>
            <h1 id="logo">Social Study</h1>
            <p>The <i>free</i> learning tool for all ages.</p>

            <div class="svg-container">
              <div id="row1">
                <div class="tooltip tooltip-bottom" data-tooltip="Create and study notes and flashcards">
                  <img class="undraw-svg" src="../assets/undraw_studying.svg" alt="studying">
                </div>
                <div class="tooltip tooltip-bottom" data-tooltip="Take practice quizzes">
                  <img class="undraw-svg" src="../assets/undraw_exams.svg" alt="quizzes">
                </div>
                <div class="tooltip tooltip-bottom" data-tooltip="Communicate with classmates">
                  <img class="undraw-svg" src="../assets/undraw_group_chat.svg" alt="communication">
                </div>
              </div>
              <div id="row2">
                <div class="tooltip tooltip-bottom" data-tooltip="Take notes and keep them organized">
                  <img class="undraw-svg" src="../assets/undraw_taking_notes.svg" alt="note taking">
                </div>
                <div class="tooltip tooltip-bottom" data-tooltip="Create and manage events and assignments">
                  <img class="undraw-svg" src="../assets/undraw_events.svg" alt="schedule management">
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Right Block: Sign Up Form -->
        <div class="column col-6 col-sm-12 col-md-12">

          <div id="right-container">

            <form @submit.prevent data-vv-scope="signup">
              <h1>Sign Up</h1>
              <span id="name-container">
                <input v-validate.disable="'required|alpha'" v-model="firstName" class="form-input" type="text" name="firstname" placeholder="First Name">
                <input v-validate.disable="'required|alpha'" v-model="lastName" class="form-input" type="text" name="lastname" placeholder="Last Name">
              </span>

              <br>
              <input v-validate.disable="'required|email'" v-model="newEmail" type="text" class="form-input" name="email" placeholder="Email Address"><br>
              <input v-validate.disable="'required|min:6'" v-model="newPassword" class="form-input" type="password" name="password" placeholder="Password"><br>
              <button @click="createAccount" class="btn btn-primary mx-1">Sign Up</button>
              <button @click="googleSignIn" class="btn mx-1">
                <v-icon name="brands/google" />
                Sign in with Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import firebase from "@/firebaseConfig";
// Constant objects; Needed for GetAuthTypeGoogle and Persistence
import FirebaseConsts from "firebase";
import MessageBar from "@/components/MessageBar";

export default {
  name: "landing",
  components: {
    MessageBar
  },
  data: function() {
    return {
      user: null,
      email: "",
      password: "",
      newEmail: "",
      newPassword: "",
      resetEmail: "",
      firstName: "",
      lastName: "",
      error: {
        show: false,
        message: "",
        passPrompt: false
      },
      message: {
        show: false,
        message: ""
      },
      modalActive: false
    };
  },
  mounted: function() {
    // this.user = firebase.auth().currentUser;
  },
  methods: {
    logIn: function() {
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
                .then(() => {
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
    createAccount: function() {
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
                      // photoURL: "" //you can pass this empty
                    })
                    .then(() => {
                      //redirect to the dashboard
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
    googleSignIn: function() {
      let provider = new FirebaseConsts.auth.GoogleAuthProvider();
      firebase
        .auth()
        // .signInWithPopup(provider)
        .signInWithRedirect(provider)
        .then(result => {
          // not sure what token is for
          // let token = result.credential.accessToken;
          this.user = result.user;
        })
        .catch(error => {
          this.error.show = true;
          this.error.passPrompt = false;
          this.error.message = error.message;
        });
    },
    sendResetEmail: function() {
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
    }
  }
};
</script>


<style lang="scss" scoped>
// TODO: Make this look good  on mobile

@import "../styleVariables.scss";

h1 {
  font-size: 4em;
}
p {
  font-size: 1.5em;
}

.svg-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

#row1,
#row2 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.undraw-svg {
  width: 14em;
  margin: 1em;
}

.undraw-svg:hover {
  transform: scale(1.25);
  top: 5px;
  z-index: 999;
}

.login-container {
  display: flex;
  flex: row;
  justify-content: flex-end;
}

.columns {
  min-height: 92vh;
}

.column input {
  width: 25em;
  margin: auto;
}

.column {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

#right-container {
  display: flex;
  flex-direction: col;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

#name-container {
  // box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 25em;
}

#name-container input {
  width: 48%;
  margin: 0;
}

.navbar {
  background-image: $nav-gradient;
  padding: 0px 10px;
}

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
}
</style>
