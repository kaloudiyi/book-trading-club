import { INIT_REC, ADD_REC, REMOVE_REC } from '../actions/types';

const initialState = { trRec: [] };

export default function(state = initialState, action) {
  switch (action.type) {
    case INIT_REC:
      return { trRec: action.payload };
    case ADD_REC:
      return { trRec: [...state.trRec, action.payload] };
    case REMOVE_REC:
      const { email, url } = action.payload;
      const newTrRec = state.trRec.filter(
        item => item.email !== email || item.url !== url
      );
      return { trRec: newTrRec };
    default:
      return state;
  }
}
