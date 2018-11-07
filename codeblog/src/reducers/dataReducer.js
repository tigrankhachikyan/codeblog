import { LOAD_POST } from "../actions/types";

let initState = {
  latestPosts: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case LOAD_POST:
      console.log("DISPATCHED FETCH_POSTS : ", action.payload);
      return {
        ...state, 
        latestPosts: [action.payload, ...state.latestPosts]
      }
    default:
      return state;
  }
};