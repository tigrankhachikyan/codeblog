import { ADD_TOAST, REMOVE_TOAST } from "../actions/types";

const initState = {
  toasts: [],
  id: 0
}

export default function toasts(state = initState, action) {
  const { payload, type } = action;

  switch (type) {
    case ADD_TOAST:
      return {
        toasts: [{...payload, id: state.id}, ...state.toasts],
        id: state.id +1
      };

    case REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== payload)
      }

    default:
      return state;
  }
}