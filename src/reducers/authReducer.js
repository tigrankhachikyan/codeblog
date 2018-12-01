import { FETCH_USER, SIGNOUT} from "../actions/types";

export default (state = false, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || null;
    case SIGNOUT:
      return null;
    default:
      return state;
  }
};

