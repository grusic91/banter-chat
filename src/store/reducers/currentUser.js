import { SET_CURRENT_USER } from "../actionTypes";

const DEFULT_STATE = {
  isAuthenticated: false, // true, when logged in
  user: {} // all the user info when logged in
};

export default (state = DEFULT_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        // if user is authenticated, there is more then one kex inside of user
          /*isAuthenticated: Object.keys(action.user).length > 0*/
          // or
      // turn empty object into false or if there are keys, true
        isAuthenticated: !!Object.keys(action.user).length,
        user: action.user
      };
    default:
      return state;

  }
}
