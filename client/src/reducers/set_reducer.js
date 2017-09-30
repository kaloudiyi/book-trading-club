import {
  INIT_SETTINGS,
  EMAIL_SETTINGS,
  UPDATE_SETTINGS
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case INIT_SETTINGS:
      return {};
    case EMAIL_SETTINGS:
      const email = action.payload;
      return { email };
    case UPDATE_SETTINGS:
      const { city, country } = action.payload;
      return { ...state, city, country };
    default:
      return state;
  }
}
