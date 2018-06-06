import { createStore, applyMiddleware, compose } from 'redux';
import appReducer from './ducks';
import defaultState from './defaultState';
import thunk from 'redux-thunk';

export const store = createStore(
  appReducer,
  defaultState,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
