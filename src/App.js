import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logo from './logo.svg';
import './App.css';

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

const fetchUserAction = ({ dispatch }) => {
  dispatch({ type: 'FETCH_START' });
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => {
      return res.json();
    })
    .then(users => {
      dispatch({ type: 'FETCH_END', users });
    });
};

const store = createStore(() => ({}), {}, applyMiddleware([thunkMiddleware]));

const Username = ({ username }) => {
  return (
    <p>
      {username}
    </p>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {}

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <div className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </div>
          <div id="users">
            {this.state.users.map(u => <Username username={u.name} />)}
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
