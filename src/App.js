import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';

const fetchUserAction = () => ({ dispatch }) => {
  dispatch({ type: 'FETCH_START' });
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => {
      return res.json();
    })
    .then(users => {
      dispatch({ type: 'FETCH_END', payload: users });
    });
};


const Username = ({ username }) => {
  return (
    <p>
      {username}
    </p>
  );
};

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </div>
        <div id="users">
          {this.props.users.map(u => <Username username={u.name} />)}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    users: state.users || [],
  }),
  ({
    fetchUser: fetchUserAction,
  })
)(App);
