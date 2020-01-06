import { apiCall, setTokenHeader } from '../services/api';
import { SET_CURRENT_USER } from '../actionTypes';
import { addError, removeError} from './errors';

// action creator
export function setCurrentUser (user) {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export function setAuthorizationToken(token) {
  setTokenHeader(token);
}

export function logout() {
  //remove token from localStorage
  return dispatch => {
    localStorage.clear();
    setAuthorizationToken(false); // pass false so that can delete it for all future requests
    dispatch(setCurrentUser({}));
  }
}

// action for login or signup successfully
export function authUser(type, userData) {
 // wrap thunk in a promise, wait for the api call
  return dispatch => {
    // Promise to wait for api call to finished
    return new Promise((resolve, reject) => {
      return apiCall("post", `/api/auth/${type}`, userData)
        .then(({token, ...user}) => { // destructure data that we get from response
                                // when it is successfully save token to localStorage which will mark that user is successfuly login
          localStorage.setItem("jwtToken", token); // when it is successfully save token to localStorage which will mark that user is successfuly login
          setAuthorizationToken(token); // when user successfully logs in, pass in that token and send it in all future requests
          dispatch(setCurrentUser(user)); // this creates user in redux store
          dispatch(removeError());
          resolve(); // api call succeeded
        })
        .catch(err => {
          dispatch(addError(err.message))
          reject(); // api call failed
        });
    });
  }
}
