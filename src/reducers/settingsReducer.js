import { 
  LOAD_SETTINGS,
  UPDATE_SETTINGS,
  ASSIGN_DEFAULT_SETTINGS,
  REMOVE_USER_SETTINGS
} from "../actions/types";


export default function settings(state = {}, action) {
  const { payload, type } = action;

  switch (type) {
    case LOAD_SETTINGS:
      return {
        ...state,
        ...payload
      };
    case UPDATE_SETTINGS:
      return {
        ...state,
        ...payload
      };
    case ASSIGN_DEFAULT_SETTINGS:
      return {
        ...payload,
      };
    case REMOVE_USER_SETTINGS:
      return {};
    default:
      return state;
  }
}