import React from 'react';
import { Provider } from 'react-redux'; // wrap applycation so we can use redux-store
import {configureStore} from '../store';
import {BrowserRouter as Router} from 'react-router-dom'; //navigate page to page
import {setAuthorizationToken, setCurrentUser } from '../store/actions/auth';
import jwtDecode from 'jwt-decode';

import Navbar from './Navbar';
import Main from './Main';

const store = configureStore();

//handle token when page refresh
if(localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  // prevent someone from manually tempering with the key of jwtToken in localStorage
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch (e) {
    store.dispatch(setCurrentUser({})); //authomatically log out
  }
}


const App = () => (
  <Provider store={store}>
    <Router>
      <div className="onboarding">
        <Navbar />
        <Main />
      </div>
    </Router>
  </Provider>
)

export default App;
