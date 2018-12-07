import { combineReducers } from "redux";

import data from "./dataReducer";
import currentPost from "./currentPostReducer";
import currentChannel from "./currentChannelReducer";
import auth from "./authReducer";
import settings from "./settingsReducer";
import toasts from "./toastsReducer";

export default combineReducers({
  data,
  currentPost,
  currentChannel,
  auth,
  settings,
  toasts
});