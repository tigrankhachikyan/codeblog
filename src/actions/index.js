import { authRef, provider, postsRef } from "../config/firebase.js";
import { LOAD_POST, LOAD_EDIT_POST, FETCH_USER, CREATE_POST } from "./types";

export const addPost = newPost => async dispatch => {
  postsRef.push().set(newPost);
};

// export const completeToDo = completeToDoId => async dispatch => {
//   todosRef.child(completeToDoId).remove();
// };

export const fetchPosts = () => async dispatch => {
  postsRef.get()
    .then((snapshot) => {
      snapshot.forEach((doc, i) => {
        dispatch({
          type: LOAD_POST,
          payload: {
            _index: i,
            postId: doc.id,
            data: doc.data()
          }
        });
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
};

export const createPost = (payload) => async dispatch => {
  return new Promise((resolve, reject) => {
    postsRef.add(payload)
      .then(ref => {
      dispatch({
        type: CREATE_POST,
        payload
      });
      resolve(ref.id);
      console.log('Added document with ID: ', ref.id, ref, ref.data);
    })
    .catch((err) => {
      reject(err);
      console.log('Error getting documents', err);
    });
  })
};

export const fetchPostById = (postId) => async dispatch => {
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

export const savePostById = (postId, payload) => async dispatch => {
  return new Promise((resolve, reject) => {
    postsRef.doc(postId).set({
      body_markdown: payload.body_markdown,
      date_modified: new Date()
    });
  })
};

export const fetchUser = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: FETCH_USER,
        payload: user
      });
    } else {
      dispatch({
        type: FETCH_USER,
        payload: null
      });
    }
  });
};

export const signIn = () => dispatch => {
  authRef
    .signInWithPopup(provider)
    .then(result => {})
    .catch(error => {
      console.log(error);
    });
};

export const signOut = () => dispatch => {
  authRef
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch(error => {
      console.log(error);
    });
};