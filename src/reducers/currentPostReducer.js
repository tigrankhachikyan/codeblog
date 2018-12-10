import {
  LOAD_CURRENT_POST,
  LOAD_CURRENT_POST_COMMENTS,
  REMOVE_CURRENT_POST,
  INCREMENT_TOTAL_LIKES,
  DECREMENT_TOTAL_LIKES
} from "../actions/types";

let initState = {
  error: null,
  post: null,
  comments: null,
  likes: null,
  iLiked: null
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
    case INCREMENT_TOTAL_LIKES:
      return {
        ...state,
        post: {...state.post, likes: state.post.likes + 1}, 
        iLiked: true
      }
    case DECREMENT_TOTAL_LIKES:
      return {
        ...state,
        post: {...state.post, likes: state.post.likes - 1}, 
        iLiked: false
      }
    case "CURRENT_POST_LOADING_ERROR":
      return {
        ...state,
        error: action.error
      }
    default:
      return state;
  }
};