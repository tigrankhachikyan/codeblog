import { 
  authRef,
  userSettingsRef,
  providerGoogle,
  providerFacebook,
  postsRef,
  postsBodyRef,
  postDraftsRef
} from "../config/firebase.js";
import { LOAD_POSTS, LOAD_EDIT_POST, FETCH_USER, CREATE_POST, REMOVE_USER_POST } from "./types";
import { ADD_TOAST, REMOVE_TOAST , LOAD_SETTINGS, SIGNOUT} from "./types";

import uid from "uid";

export const addPost = newPost => dispatch => {
  postsRef.push().set(newPost);
};

export const fetchPosts = () => dispatch => {
  postsRef.get()
    .then((snapshot) => {
      const posts = [];

      snapshot.forEach(doc => {
        const post = {
          postId: doc.id,
          data: doc.data()
        };
        posts.push(post)
      });

      dispatch({
        type: LOAD_POSTS,
        payload: { posts }
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
};

/**
 * 
 * @param {string} uid Auth user uid
 */
export const fetchUserPosts = (uid) => dispatch => {
  return new Promise((resolve, reject) => {
    const userPostsref = postsRef.where('uid', '==', uid);

    userPostsref.onSnapshot((snapshot) => {
        const docs = [];

        snapshot.forEach((doc, i) => {
          const data = doc.data();
          docs.push({...data, postId: doc.id});
        });
        dispatch({
          type: 'LOAD_USER_POSTS',
          posts: docs
        })
        resolve(docs);
      });
  })
};

/**
 * 
 * @param {Object} payload Post data
 */
export const createPost = (payload) => dispatch => {
  return new Promise((resolve, reject) => {
    const newPostRef = postsRef.doc();
    const id = newPostRef.id;
    payload.slug = payload.slug + "-" + id;

    newPostRef.set(payload)
    .then(() => {
      dispatch({
        type: CREATE_POST,
        payload
      });
      postsBodyRef.doc(id).set({
        body_markdown: "",
        date_modified: new Date()
      });
      resolve(id);
    })
    .catch((err) => {
      reject(err);
    });
  })
};

export const fetchPostById = (postId) => dispatch => {
  return new Promise((resolve, reject) => {
    postsRef.doc(postId).get()
      .then(doc => {
        if (!doc.exists) {
          reject('No such document!');
        } else {
          dispatch({
            type: LOAD_EDIT_POST,
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
};

export const fetchPostBodyById = (postId) => dispatch => {
  return new Promise((resolve, reject) => {
    postsBodyRef.doc(postId).get()
      .then(doc => {
        if (!doc.exists) {
          reject('No such document!');
        } else {
          resolve(doc.data());
        }
      })
      .catch((err) => {
        reject(err);
        console.log('Error getting documents', err);
      });
  })
};

export const fetchPostDraftById = (postId) => dispatch => {
  return new Promise((resolve, reject) => {
    postDraftsRef.doc(postId).get()
      .then(doc => {
        if (!doc.exists) {
          resolve(null);
        } else {
          resolve(doc.data());
        }
      })
      .catch((err) => {
        reject(err);
        console.log('Error getting documents', err);
      });
  })
};
/**
 * 
 * @param {*} uid 
 * @param {*} slug 
 */
export const fetchUserPostBySlug = (uid, slug) => dispatch => {
  return new Promise((resolve, reject) => {
    const postRef = postsRef.where("uid", "==", uid).where("slug", "==", slug);
    
    postRef.get()
      .then(snapshot => {
        const posts = [];
        snapshot.forEach(doc => {
          const post = {
            postId: doc.id,
            data: doc.data()
          };
          posts.push(post)
        });
        
        posts.length === 1 
          ? resolve(posts[0])
          : reject("No single post found for this query")
      })
      .catch((err) => {
        reject(err);
        console.log('Error getting documents', err);
      });
  })
};

/**
 * 
 * @param {*} username 
 * @param {*} slug 
 */
export const fetchUserPostByUsernameAndSlug = (username, slug) => dispatch => {
  return new Promise((resolve, reject) => {
    const postRef = postsRef.where("user.userName", "==", username).where("slug", "==", slug);
    
    postRef.get()
      .then(snapshot => {
        const posts = [];
        snapshot.forEach(doc => {
          const post = {
            postId: doc.id,
            data: doc.data()
          };
          posts.push(post)
        });
        
        posts.length === 1 
          ? resolve(posts[0])
          : reject("No single post found for this query")
      })
      .catch((err) => {
        reject(err);
        console.log('Error getting documents', err);
      });
  })
};

export const deletePostById = postId => async dispatch => {
  await Promise.all([
    postDraftsRef.doc(postId).delete(),
    postsRef.doc(postId).delete(),
    postsBodyRef.doc(postId).delete(),
  ]);

  dispatch({
    type: REMOVE_USER_POST,
    payload: { postId }
  })
};

export const savePostById = (postId, payload) => dispatch => {
  return new Promise((resolve, reject) => {
    postsRef.doc(postId).update({
      body_markdown: payload.body_markdown,
      date_modified: new Date()
    });
    resolve();
  })
};

export const savePostDraftById = (postId, payload) => dispatch => {
  return new Promise((resolve, reject) => {
    postDraftsRef.doc(postId).set({
      body_markdown: payload.body_markdown,
      date_modified: new Date()
    });
    resolve();
  })
};

export const publishDraftById = (postId) => dispatch => {
  return new Promise((resolve, reject) => {
    postDraftsRef.doc(postId).get()
      .then(doc => {
        if (!doc.exists) {
          reject('No such document!');
        } else {
          const draft = doc.data();
          postsBodyRef.doc(postId).update({
            body_markdown: draft.body_markdown,
            date_modified: new Date()
          });
          resolve();
        }
      })
      .then(() => postDraftsRef.doc(postId).delete())
      .catch((err) => {
        reject(err);
        console.log('Error getting documents', err);
      });
  })
};



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
    USER_NAME: userNamePrefix
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
  return new Promise((resolve, reject) => {
    authRef.onAuthStateChanged(user => {
      if (!user) {
        reject('No User found');
        return;
      }

      dispatch({
        type: FETCH_USER,
        payload: user
      });

      setTimeout(() => { loadUserSettings(dispatch, user) }, 0);
    });
  })
};

export const signInWithGoogle = () => dispatch => {
  authRef
    .signInWithPopup(providerGoogle)
    .then(result => {})
    .catch(error => {
      console.log(error);
    });
};

export const signInWithFacebook = () => dispatch => {
  authRef
    .signInWithPopup(providerFacebook)
    .then(result => {})
    .catch(error => {
      console.log(error);
    });
};

export const signInWithEmailAndPassword = (email, password) => dispatch => {
  authRef
    .signInWithEmailAndPassword(email, password)
    .then(result => {})
    .catch(error => {
      console.log(error);
    });
};

export const signOut = () => dispatch => {
  authRef
    .signOut()
    .then(() => {
      dispatch({
        type: SIGNOUT
      })
    })
    .catch(error => {
      console.log(error);
    });
};

export const addToast = (options = {}) => (dispatch, getState) => {
  const { toasts } = getState();
  dispatch({
    payload: options,
    type: ADD_TOAST
  });
  setTimeout(() => {
    dispatch({
      payload: toasts.id,
      type: REMOVE_TOAST
    })
  }, 2000);
}

export const removeToast = (id) => dispatch => {
  dispatch({
    payload: id,
    type: REMOVE_TOAST
  });
}