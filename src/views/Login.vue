<template>
  <div class="login">
    <h1>Welcome to Social Study!</h1>

    <!-- Toggle between sign in and sign up -->
    <label class="switch">
      <input type="checkbox" v-model="hasAccount">
      <span class="slider round"></span>
    </label>

    <!-- Conditional rendering of login or create account prompts -->
    <!-- Login -->
    <div v-show="hasAccount">
      <h2>Sign In</h2>
      <input v-model="email" type="text" placeholder="Email Address" autofocus><br>
      <input v-model="password" type="password" placeholder="Password"><br>
      <button @click="validateEmail">Log In</button>
    </div>

    <!-- Create new account -->
    <div v-show="!hasAccount">
      <h2>Sign Up</h2>
      <input v-model="userName" type="text" placeholder="Name"><br>
      <input v-model="email" type="text" placeholder="Email Address"><br>
      <input v-model="password" type="password" placeholder="Password"><br>
      <button @click="validateEmail">Sign Up</button>
    </div>

    <button @click="debug">Print User</button>

  </div>
</template>

<script>
import firebase from "../firebase_config.js";

export default {
  name: "Login",
  data: function() {
    return {
      email: "",
      password: "",
      hasAccount: false,
      userName: ""
    };
  },
  methods: {
    debug: function() {
      console.log(firebase.auth().currentUser.displayName);
    },
    // TODO: Implement option that allows a user to sign in with their google account
    // TODO: Add options to reset password and setup email confirmation
    validateEmail: function() {
      if (this.hasAccount) {
        // Attempt to log in
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .catch(function(error) {
            console.log(error.message);
          });
      } else {
        // hacky as fuck
        var self = this;

        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(function() {
            let user = firebase.auth().currentUser;
            if (user) {
              user
                .updateProfile({
                  displayName: self.userName, //pass displayName from your signup form here
                  photoURL: "" //you can pass this empty
                })
                .then(function() {
                  console.log("Finished updating username");
                  //redirect to your post-registration page
                });
            } else {
              console.log("currentUser didn't return");
            }
          })
          .catch(function(error) {
            console.log(error.message);
          });
      }
    }
  }
};

// Gets run every time the authentication state changes.
firebase.auth().onAuthStateChanged(function(user) {
  // User is logged in
  if (user) {
    // User is signed in.
    let username = user.displayName;
    console.log("Displayname: " + username);
  } else {
    // User is signed out.
    // ...
  }
});
</script>

<style scoped>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
