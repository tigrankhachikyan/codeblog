import {
  LOAD_POSTS,
  LOAD_MOST_LIKED_POSTS,
  LOAD_USER_POSTS,
  REMOVE_USER_POST,
  REMOVE_USER_POSTS,
  REMOVE_USER_BOOKMARKS,
  LOAD_USER_BOOKMARKS
} from "../actions/types";

let initState = {
  latestPosts: [],
  mostLikedPosts: [],
  userPosts: [],
  userBookmarks : [],
  editPost: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return {
        ...state, 
        latestPosts: [...action.payload.posts]
      }
    case LOAD_MOST_LIKED_POSTS:
      return {
        ...state, 
        mostLikedPosts: [...action.payload.posts]
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
    case LOAD_USER_BOOKMARKS:
      return {
        ...state, 
        userBookmarks: action.bookmarks
      }
    case REMOVE_USER_BOOKMARKS:
      return {
        ...state, 
        userBookmarks: []
      }
    default:
      return state;
  }
};