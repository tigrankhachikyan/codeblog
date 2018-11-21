import { 
  LOAD_SETTINGS,
  ASSIGN_DEFAULT_SETTINGS,
} from "../actions/types";


export default function settings(state = {}, action) {
  const { payload, type } = action;

  switch (type) {
    case LOAD_SETTINGS:
      return {
        ...state,
        ...payload
      };

    case ASSIGN_DEFAULT_SETTINGS:
      return {
        ...payload,
      };

    default:
      return state;
  }
}