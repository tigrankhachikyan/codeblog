import { 
  userSettingsRef
} from "../../config/firebase.js";

import {
  LOAD_SETTINGS,
  ASSIGN_DEFAULT_SETTINGS,
  UPDATE_SETTINGS
} from "../types";

const initState = {
  AUTO_SAVE_DRAFT: true,
  AUTO_SAVE_DRAFT_INTERVAL: 7 * 1000, // 7 sec
};

export const loadUserSettings = (uid) => async dispatch => {
  return new Promise((resolve, reject) => {
    userSettingsRef.doc(uid).get()
      .then(doc => {
        if (!doc.exists) {
          reject('No such document!');
        } else {
          dispatch({
            type: LOAD_SETTINGS,
            payload: doc.data()
          });
          resolve(doc.data());
        }
      })
      .catch((err) => {
        reject(err);
        console.log('Error getting documents', err);
      });
  })
}
/**
 * 
 * @param {*} uid 
 * @param {*} payload 
 */
export const updateUserSettings = (uid, payload) => async dispatch => {
  return new Promise((resolve, reject) => {
    userSettingsRef.doc(uid).update({...payload})
      .then(() => {
        dispatch({
          type: UPDATE_SETTINGS,
          payload: {...payload}
        });
        resolve(payload);
      })
      .catch((err) => {
        reject(err);
        console.log('Error updating user settings', err);
      });
  })
}

export const assignUserDefaultSettings = (auth, payload) => async dispatch => {
  const settings = {
    ...initState,
    ...payload
  };

  return new Promise((resolve, reject) => {
    userSettingsRef.doc(auth.uid).set(settings)
      .then(doc => {
        dispatch({
          type: ASSIGN_DEFAULT_SETTINGS,
          payload: { ...settings }
        });
      })
      .catch((err) => {
        reject(err);
        console.log('Error updating user settings', err);
      });
  })
}

export const getUserByUserName = (username) => async dispatch => {
  return new Promise((resolve, reject) => {
    const userRref = userSettingsRef.where('USER_NAME', '==', username);
    userRref.get()
      .then(snapshot => {
        const users = [];
        snapshot.forEach(doc => users.push({uid: doc.id}))
        if (users.length === 1) {
          resolve(users[0]);
        } else {
          reject("No single user found!");
        }
      })
      .catch((err) => {
        console.log('Error getting documents', err);
        reject(err);
      });
  })
};