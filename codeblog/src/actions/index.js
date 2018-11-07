import { postsRef } from "../config/firebase";
import { FETCH_POSTS } from "./types";

export const addPost = newPost => async dispatch => {
  postsRef.push().set(newPost);
};

// export const completeToDo = completeToDoId => async dispatch => {
//   todosRef.child(completeToDoId).remove();
// };

export const fetchPosts = () => async dispatch => {
  postsRef.on("value", snapshot => {
    dispatch({
      type: FETCH_POSTS,
      payload: snapshot.val()
    });
  });
};