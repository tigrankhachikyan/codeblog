import { LOAD_CURRENT_CHANNEL_POSTS, REMOVE_CURRENT_CHANNEL_POSTS } from "../actions/currentChannel/types";

const initState = {
  posts: null
};

export default (state = initState, action) => {
  switch (action.type) {
    case LOAD_CURRENT_CHANNEL_POSTS:
      return {
        ...state, 
        posts: [...action.posts]
      }
    case REMOVE_CURRENT_CHANNEL_POSTS:
      return {
        posts: null
      }
    default:
      return state;
  }
};