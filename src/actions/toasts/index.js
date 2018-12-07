import { ADD_TOAST, REMOVE_TOAST } from "./types";

export const addToast = (options = {}) => async (dispatch, getState) => {
  const { toasts } = getState();
  dispatch({
    payload: options,
    type: ADD_TOAST
  });
  setTimeout(() => {
    dispatch({
      payload: toasts.id,
      type: REMOVE_TOAST
    })
  }, 2000);
}

export const removeToast = (id) => async dispatch => {
  dispatch({
    payload: id,
    type: REMOVE_TOAST
  });
}
