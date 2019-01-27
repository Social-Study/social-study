import { db } from "@/firebaseConfig";

// These functions all relate to loading firebase data for a specific user.

/**
 * Search the firestore for all Study Groups that have the uid in the members list
 *
 * Returns: An array of Study Group objects
 *          Error String on failure
 */
async function getUserGroups(uid) {
  try {
    const querySnapshot = await db
      .collection("study-groups")
      .where("members", "array-contains", uid)
      .get();
    let groupList = [];
    querySnapshot.forEach(doc => {
      groupList.push({
        className: doc.data().className,
        membersLength: doc.data().members.length,
        groupID: doc.id
      });
    });
    return Promise.all(groupList);
  } catch (error) {
    console.log("getUserGroup: " + error);
  }
}

/**
 * Search the firestore for a user with id of 'uid'
 *
 * Returns: All document data on success
 *          Error String on failure
 */
function getUserData(uid) {
  return new Promise((resolve, reject) => {
    db.collection("users")
      .doc(uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          resolve(doc.data());
        } else {
          reject("User not found.");
        }
      });
  });
}

export { getUserData, getUserGroups };
