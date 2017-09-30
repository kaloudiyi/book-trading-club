import { FOUND_BOOK, ERROR_BOOK } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FOUND_BOOK:
      return { error: false };
    case ERROR_BOOK:
      return { error: true };
    default:
      return state;
  }
}
