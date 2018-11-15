import { LOAD_POSTS, LOAD_EDIT_POST, CREATE_POST } from "../actions/types";

let initState = {
  latestPosts: [],
  editPost: null,
};

export default (state = initState, action) => {
  console.log("DISPATCHER RUNNED ", action );
  switch (action.type) {
    case LOAD_POSTS:
      console.log("DISPATCHED LOAD_POST : ", action.payload);
      return {
        ...state, 
        latestPosts: [...action.payload.posts, ...state.latestPosts]
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