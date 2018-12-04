import {
  LOAD_POSTS,
  LOAD_USER_POSTS,
  LOAD_EDIT_POST,
  REMOVE_USER_POST,
  REMOVE_USER_POSTS
} from "../actions/types";

let initState = {
  latestPosts: [],
  userPosts: [],
  editPost: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return {
        ...state, 
        latestPosts: [...action.payload.posts]
      }
    case REMOVE_USER_POST:
      return {
        ...state, 
        userPosts: state.userPosts.filter(post => post.postId !== action.payload.postId)
      }
    case REMOVE_USER_POSTS:
      return {
        ...state, 
        userPosts: []
      }
    case LOAD_USER_POSTS:
      return {
        ...state, 
        userPosts: [...action.posts]
      }
    case LOAD_EDIT_POST:
      return {
        ...state, 
        editPost: {...action.payload}
      }
    default:
      return state;
  }
};