import {
  INIT_LIST_BOOKS,
  ADD_LIST_BOOKS,
  REMOVE_LIST_BOOKS,
  TRADE_LIST_BOOKS
} from '../actions/types';

const initialState = { books: [] };

export default function(state = initialState, action) {
  switch (action.type) {
    case INIT_LIST_BOOKS:
      return { books: action.payload };
    case ADD_LIST_BOOKS:
      return {
        books: [...state.books, action.payload]
      };
    case REMOVE_LIST_BOOKS:
      const { email, url } = action.payload;
      const newBooks = state.books.filter(
        item => item.email !== email || item.url !== url
      );
      return { books: newBooks };
    case TRADE_LIST_BOOKS:
      const { index, requester } = action.payload;
      const t = state.books.slice(0);
      t[index].requester = requester;
      return { books: t };
    default:
      return state;
  }
}
