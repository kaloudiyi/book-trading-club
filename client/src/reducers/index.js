import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import setReducer from './set_reducer';
import bookReducer from './book_reducer';
import listBooksReducer from './list_books_reducer';
import askReducer from './ask_reducer';
import recReducer from './rec_reducer';

export default combineReducers({
  form,
  auth: authReducer,
  set: setReducer,
  book: bookReducer,
  listBooks: listBooksReducer,
  ask: askReducer,
  rec: recReducer
});
