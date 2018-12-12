import {
  EDIT_POST_LOAD_START,
  EDIT_POST_LOAD_ERROR,
  EDIT_POST_LOAD_SUCCESS,
  EDIT_POST_CLEAR_ALL
} from "../actions/editPost/types";

let initState = {
  error:   null,
  loading: null,
  header:  null,
  body:    null,
};

export default (state = initState, action) => {
  switch (action.type) {

    case EDIT_POST_LOAD_START:
      return {
        ...state,
        loading: true
      }
    case EDIT_POST_LOAD_ERROR:
      return {
        ...state, 
        error:   action.error,
        loading: false
      }
    case EDIT_POST_LOAD_SUCCESS:
      return {
        ...state, 
        header: {...action.payload.header || state.header},
        body:   {...action.payload.body || state.body},
        loading: false
      }
    case EDIT_POST_CLEAR_ALL:
      return {...initState}
    default:
      return state;
  }
};