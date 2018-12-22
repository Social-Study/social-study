// These functions all relate to loading firebase data for a specific Study Group

import { db } from "../firebaseConfig";

/**
 * Load all group data for the given groupID
 * Any user can load the public facing group data
 * Params: groupID - the groupID of the group to load data from
 * Return: Returns groupData + the group's doc ID on success
 *         Returns error string on failure
 */
function getGroupData(groupID) {
  return new Promise((resolve, reject) => {
    db.collection("study-groups")
      .doc(groupID)
      .get()
      .then(doc => {
        if (doc.exists) {
          resolve({ id: doc.id, ...doc.data() });
        } else {
          reject("Group not found.");
        }
      });
  });
}

/**
 * Check if the given userID is a member of the group defined by the groupID
 * Params: userID - the id of the user to check
 *         groupID - the group that should be checked to verify membership
 */
function checkAccess(userID, groupID) {
  return new Promise((resolve, reject) => {
    db.collection("study-groups")
      .doc(groupID)
      .get()
      .then(doc => {
        if (doc.data().members.includes(userID)) {
          resolve();
        } else {
          reject();
        }
      });
  });
}

/**
 * Check if the given userID is the owner of the group defined by the groupID
 * Params: userID - the id of the user to check
 *         groupID - the group that should be checked to verify ownership
 */
function checkOwner(userID, groupID) {
  return new Promise((resolve, reject) => {
    db.collection("study-groups")
      .doc(groupID)
      .get()
      .then(doc => {
        if (doc.data().owner === userID) {
          resolve();
        } else {
          reject();
        }
      });
  });
}

export { getGroupData, checkAccess, checkOwner };
