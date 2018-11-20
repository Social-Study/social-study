import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBm8Y6ihxnlsTdvxbQ11X2owrg-C40Hon4",
  authDomain: "social-study-f3af2.firebaseapp.com",
  databaseURL: "https://social-study-f3af2.firebaseio.com",
  projectId: "social-study-f3af2",
  storageBucket: "social-study-f3af2.appspot.com",
  messagingSenderId: "265403435232"
};

// Export firebase object to be used for certain static methods like:
//  - Persistance
//  - GoogleAuthProvider
export const FirebaseConsts = firebase;
// export default config;
export default firebase.initializeApp(config);

// TODO: Change it so that components only use the parts of firebase that they need
// Should reduce load time if you only load auth when you need it, etc.

// TODO: Rename file to match naming scheme
