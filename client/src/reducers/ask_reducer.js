import { INIT_ASK, ADD_ASK, REMOVE_ASK } from '../actions/types';

const initialState = { trAsk: [] };

export default function(state = initialState, action) {
  switch (action.type) {
    case INIT_ASK:
      return { trAsk: action.payload };
    case ADD_ASK:
      return { trAsk: [...state.trAsk, action.payload] };
    case REMOVE_ASK:
      const { email, url } = action.payload;
      const newTrAsk = state.trAsk.filter(
        item => item.email !== email || item.url !== url
      );
      return { trAsk: newTrAsk };
    default:
      return state;
  }
}
