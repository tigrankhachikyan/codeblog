import { combineReducers } from "redux";

import data from "./dataReducer";
import auth from "./authReducer";
import toasts from "./toastsReducer";

export default combineReducers({
  data,
  auth,
  toasts
});