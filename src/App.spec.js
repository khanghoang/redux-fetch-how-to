const nodeFetch = require('node-fetch');
global.fetch = nodeFetch;

import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from './App';
import usersData from './users';
import nock from 'nock';

nock('https://jsonplaceholder.typicode.com')
  .get('/users')
  .reply(200, JSON.stringify(usersData));

describe('App', () => {
  it('renders list of users', done => {
    const users = mount(<App />).find('#users');
    setTimeout(function() {
      expect(toJson(users)).toMatchSnapshot();
      done();
    }, 10);
  });
});
