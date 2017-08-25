import React from 'react';
import App from './App';
import { connect, Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';

const userReducer = (state = { users: [], isFetching: false }, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return {
        isFetching: true,
        users: [],
      };
    case 'FETCH_END':
      return {
        isFetching: true,
        users: action.payload,
      };
    default: {
      return state;
    }
  }
};

const thunkMiddleware = store => next => action => {
  if (typeof action === 'function') {
    action(store);
    return;
  }

  next(action);
};

const store = createStore(userReducer, {}, applyMiddleware(thunkMiddleware));

export default () => (
  <Provider store={store}><App /></Provider>
);
