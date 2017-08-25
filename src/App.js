import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const User = ({ name }) => (
  <p>{name}</p>
);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(users => {
        this.setState({
          users,
        });
      })
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <div id='users'>
            {this.state.users.map(({ name }) => <User name={name}/>)}
          </div>
        </p>
      </div>
    );
  }
}

export default App;
