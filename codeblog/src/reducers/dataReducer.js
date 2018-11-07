import { FETCH_POSTS } from "../actions/types";

let initState = {
  posts: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      console.log("DISPATCHED FETCH_POSTS : ", action.payload);
      return {
        ...state, 
        posts: [action.payload, ...state.posts]
      }
    default:
      return state;
  }
};