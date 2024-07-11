import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducers';
// import { composeWithDevTools } from 'redux-devtools-extension';

// Conditionally compose with Redux DevTools Extension if available
const composeEnhancers =
  typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

// Apply middleware and compose enhancers
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk.withExtraArgument(/* extra argument if needed */))
    // other enhancers if any
  )
);

export default store;
