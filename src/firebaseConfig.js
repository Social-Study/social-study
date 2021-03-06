import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyBm8Y6ihxnlsTdvxbQ11X2owrg-C40Hon4",
  authDomain: "social-study-f3af2.firebaseapp.com",
  databaseURL: "https://social-study-f3af2.firebaseio.com",
  projectId: "social-study-f3af2",
  storageBucket: "social-study-f3af2.appspot.com",
  messagingSenderId: "265403435232"
};

// Export plain firebase object to be used for certain static methods like:
//  - Persistance
//  - GoogleAuthProvider
export const FirebaseConsts = firebase;
export default firebase.initializeApp(config);

export const db = firebase.firestore();
export const Storage = firebase.storage();
// db.settings({
//   timestampsInSnapshots: true
// });
