import { combineReducers } from "redux";

import data from "./dataReducer";
import currentPost from "./currentPostReducer";
import auth from "./authReducer";
import settings from "./settingsReducer";
import toasts from "./toastsReducer";

export default combineReducers({
  data,
  currentPost,
  auth,
  settings,
  toasts
});