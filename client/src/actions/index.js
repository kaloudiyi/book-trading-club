import axios from 'axios';
import history from '../components/history';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  INIT_SETTINGS,
  EMAIL_SETTINGS,
  UPDATE_SETTINGS,
  FOUND_BOOK,
  ERROR_BOOK,
  INIT_LIST_BOOKS,
  ADD_LIST_BOOKS,
  REMOVE_LIST_BOOKS,
  TRADE_LIST_BOOKS,
  INIT_ASK,
  ADD_ASK,
  REMOVE_ASK,
  INIT_REC,
  REMOVE_REC
} from './types';

const GOOGLE_BOOK_API =
  'https://www.googleapis.com/books/v1/volumes?startIndex=0&maxResults=1&q=';

export function signinUser({ email, password }) {
  return function(dispatch) {
    //submit email/password to the server
    axios
      .post('/api/signin', { email, password })
      .then(response => {
        // If request is good
        // - update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT token
        localStorage.setItem('token', response.data.token);
        // - Redirect to the route '/feature'
        history.push('/');
        // initialize settings with email
        dispatch({
          type: EMAIL_SETTINGS,
          payload: email
        });
        // load requests
        axios
          .post(
            '/api/load_requests',
            {},
            {
              headers: { authorization: localStorage.getItem('token') }
            }
          )
          .then(response => {
            dispatch({
              type: INIT_LIST_BOOKS,
              payload: response.data
            });
            let myDataAsk = [];
            let myDataRec = [];

            response.data.forEach((item, index) => {
              if (email === item.requester) {
                // to improve
                myDataAsk.push({ ...item, index });
              } else {
                if (email === item.email && item.requester !== '') {
                  // to improve
                  myDataRec.push({ ...item, index });
                }
              }
            });

            dispatch({ type: INIT_ASK, payload: myDataAsk });
            dispatch({ type: INIT_REC, payload: myDataRec });

            // get settings
            axios
              .post(
                'api/get_settings',
                { email },
                {
                  headers: { authorization: localStorage.getItem('token') }
                }
              )
              .then(response => {
                dispatch({
                  type: UPDATE_SETTINGS,
                  payload: response.data
                });
              });
          });
      })
      .catch(() => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Bad Login Info'));
      });
  };
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios
      .post('/api/signup', { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        history.push('/');
        // initialize settings with email
        dispatch({
          type: EMAIL_SETTINGS,
          payload: email
        });
      })
      .catch(function(error) {
        dispatch(authError(error.response.data.error));
      });
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return function(dispatch) {
    dispatch({ type: UNAUTH_USER });
    dispatch({ type: INIT_SETTINGS });
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function updateSettings({ email, city, country }) {
  return function(dispatch) {
    axios
      .post(
        '/api/set_settings',
        { email, city, country },
        { headers: { authorization: localStorage.getItem('token') } }
      )
      .then(response => {
        dispatch({
          type: UPDATE_SETTINGS,
          payload: { city, country }
        });
      });
  };
}

export function addBook(email, title) {
  return function(dispatch) {
    axios.get(`${GOOGLE_BOOK_API}"${title}"`).then(response => {
      if (response.data.totalItems > 0) {
        const url = response.data.items[0].volumeInfo.imageLinks.smallThumbnail;
        const title = response.data.items[0].volumeInfo.title;
        axios.post(
          '/api/add_request',
          { email, url, title },
          { headers: { authorization: localStorage.getItem('token') } }
        );
        dispatch({
          type: FOUND_BOOK
        });
        dispatch({
          type: ADD_LIST_BOOKS,
          payload: { email, url, title, requester: '' }
        });
      } else {
        dispatch({
          type: ERROR_BOOK
        });
      }
    });
  };
}

export function removeBook(email, url) {
  axios.post(
    '/api/remove_request',
    { email, url },
    { headers: { authorization: localStorage.getItem('token') } }
  );
  return function(dispatch) {
    dispatch({
      type: REMOVE_LIST_BOOKS,
      payload: { email, url }
    });
  };
}

export function addAsk(email, url, title, index, requester) {
  axios.post(
    '/api/update_request',
    { email, url, requester },
    { headers: { authorization: localStorage.getItem('token') } }
  );
  return function(dispatch) {
    dispatch({
      type: ADD_ASK,
      payload: { email, url, title, index, requester }
    });
    dispatch({
      type: TRADE_LIST_BOOKS,
      payload: { index, requester }
    });
  };
}

export function removeAsk(email, url, index) {
  axios.post(
    '/api/update_request',
    { email, url, requester: '' },
    { headers: { authorization: localStorage.getItem('token') } }
  );
  return function(dispatch) {
    dispatch({
      type: REMOVE_ASK,
      payload: { email, url }
    });
    dispatch({
      type: TRADE_LIST_BOOKS,
      payload: { index, requester: '' }
    });
  };
}

export function removeRec(email, url, index) {
  axios.post(
    '/api//update_request',
    { email, url, requester: '' },
    { headers: { authorization: localStorage.getItem('token') } }
  );
  return function(dispatch) {
    dispatch({
      type: REMOVE_REC,
      payload: { email, url }
    });
    dispatch({
      type: TRADE_LIST_BOOKS,
      payload: { index, requester: '' }
    });
  };
}

export function agreeRec(email, url) {
  axios.post('/api/remove_request', { email, url });
  return function(dispatch) {
    dispatch({
      type: REMOVE_REC,
      payload: { email, url }
    });
    dispatch({
      type: REMOVE_LIST_BOOKS,
      payload: { email, url }
    });
  };
}
