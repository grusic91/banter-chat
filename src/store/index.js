/* configuring store */
import rootReducer from './reducers'; // cant create sotre without passing in rootReducer
import { createStore, applyMiddleware, compose } from 'redux';
//compose allow us combine functions together
// applyMiddleware is usefull for any kind of middleware that we use
import thunk from 'redux-thunk'; /* thunk allow us to delay the evaluation of expression
and it is essential for working with async*/

export function configureStore(){
  // make a store
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))// enhance store
  );
  return store;
}
