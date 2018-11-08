import { LOAD_POST, CREATE_POST } from "../actions/types";

let initState = {
  latestPosts: [],
  newPost: null,
};

export default (state = initState, action) => {
  console.log("DISPATCHER RUNNED " );
  switch (action.type) {
    case LOAD_POST:
      console.log("DISPATCHED LOAD_POST : ", action.payload);
      return {
        ...state, 
        latestPosts: [action.payload, ...state.latestPosts]
      }
    case CREATE_POST:
      console.log("DISPATCHED CREATE_POST : ", action.payload);
      return {
        ...state, 
        newPost: {...action.payload}
      }
    default:
      return state;
  }
};