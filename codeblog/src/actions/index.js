import { postsRef } from "../config/firebase.js";
import { FETCH_POSTS } from "./types";

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
        type: FETCH_POSTS,
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