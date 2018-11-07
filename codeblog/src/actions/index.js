import { authRef, provider, postsRef } from "../config/firebase.js";
import { LOAD_POST, FETCH_USER } from "./types";

export const addPost = newPost => async dispatch => {
  postsRef.push().set(newPost);
};

// export const completeToDo = completeToDoId => async dispatch => {
//   todosRef.child(completeToDoId).remove();
// };

export const fetchPosts = () => async dispatch => {
  postsRef.get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      dispatch({
        type: LOAD_POST,
        payload: { 
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