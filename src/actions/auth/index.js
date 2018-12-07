import { 
  authRef,
  userSettingsRef,
  providerGoogle,
  providerFacebook,
} from "../../config/firebase";

import { REMOVE_USER_POSTS } from "../types";
import { LOAD_SETTINGS, REMOVE_USER_SETTINGS } from "../settings/types";
import { FETCH_USER, SIGNOUT } from "./types";

import uid from "uid";

const assignDefaultUserSettings = async (dispatch, auth) => {
  let userNamePrefix = uid(3);
  if (auth.email) {
    const result = /^([^@]+).+$/.exec(auth.email);
    const emailPrefix = result[1];
    userNamePrefix = emailPrefix + userNamePrefix;
  } else if (auth.displayName) {
    const userNameStipped = auth.displayName.replace(/\s+/, '').toLowerCase();
    userNamePrefix = userNameStipped + userNamePrefix;
  }

  const settings = {
    USER_NAME: userNamePrefix,
    AUTO_SAVE_DRAFT: true,
    AUTO_SAVE_DRAFT_INTERVAL: 10 * 1000, // 10 sec
  };

  try {
    userSettingsRef.doc(auth.uid).set(settings);
    dispatch({
      type: LOAD_SETTINGS,
      payload: settings
    })
  } catch(e) {
    console.log(e);
  }
}

const loadUserSettings = async (dispatch, auth) => {
  try {
    const doc = await userSettingsRef.doc(auth.uid).get();

    if (!doc.exists) {
      assignDefaultUserSettings(dispatch, auth);
    } else {
      dispatch({
        type: LOAD_SETTINGS,
        payload: doc.data()
      });
      return doc.data();
    }
  } catch(e) {
    console.log(e);
  }
}

export const fetchUser = () => async dispatch => {
  authRef.onAuthStateChanged(user => {
    if (!user) return;

    dispatch({
      type: FETCH_USER,
      payload: user
    });

    setTimeout(() => { loadUserSettings(dispatch, user) }, 0);
  });
};

export const signUpWithEmailAndPassword = (email, password) => async dispatch => {
  authRef.createUserWithEmailAndPassword(email, password)
  .catch(function(error) {
    console.log(error);
  });
};

export const signInWithGoogle = () => async dispatch => {
  authRef
    .signInWithPopup(providerGoogle)
    .then(result => {})
    .catch(error => {
      console.log(error);
    });
};

export const signInWithFacebook = () => async dispatch => {
  authRef
    .signInWithPopup(providerFacebook)
    .then(result => {})
    .catch(error => {
      console.log(error);
    });
};

export const signInWithEmailAndPassword = (email, password) => async dispatch => {
  authRef
    .signInWithEmailAndPassword(email, password)
    .then(result => {})
    .catch(error => {
      console.log(error);
    });
};

export const signOut = () => async dispatch => {
  authRef
    .signOut()
    .then(() => {
      dispatch({
        type: SIGNOUT
      });
      dispatch({
        type: REMOVE_USER_POSTS
      });
      dispatch({
        type: REMOVE_USER_SETTINGS
      });
    })
    .catch(error => {
      console.log(error);
    });
};
