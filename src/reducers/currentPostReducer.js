import {
  LOAD_CURRENT_POST,
  LOAD_CURRENT_POST_COMMENTS,
  REMOVE_CURRENT_POST
} from "../actions/types";

let initState = {
  post: null,
  comments: null,
  likes: null
};

export default (state = initState, action) => {
  switch (action.type) {
    case LOAD_CURRENT_POST:
      return {
        ...state, 
        ...action.payload,
      }
    case LOAD_CURRENT_POST_COMMENTS:
      return {
        ...state, 
        comments: [...action.payload.comments]
      }
    case REMOVE_CURRENT_POST:
      return {
        post: null, 
        comments: null
      }
    default:
      return state;
  }
};