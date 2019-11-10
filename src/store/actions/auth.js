import { apiCall } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import { addError, removeError} from "./errors";

// action creator
export function setCurrentUser (user) {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export function logout() {
  return dispatch => {
    localStorage.clear();
    dispatch(setCurrentUser({}));
  }
}

export function authUser(type, userData) {
  return dispatch => {

    return new Promise((resolve, reject) => {
      debugger
      return apiCall("post", `/api/auth/${type}`, userData)
        .then(({token, ...user}) => {
          debugger
          localStorage.setItem("jwtToken", token);
          dispatch(setCurrentUser(user));
          dispatch(removeError())
          resolve();
        })
        .catch(err => {
          console.log(err.message);
          dispatch(addError(err.message))
          reject();
        });
    });
  }
}
