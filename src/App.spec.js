const nodeFetch = require('node-fetch');
global.fetch = nodeFetch;

import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Root from './root';
import usersData from './users';
import nock from 'nock';

nock('https://jsonplaceholder.typicode.com')
  .get('/users')
  .reply(200, JSON.stringify(usersData));

describe('Root', () => {
  it('renders list of users', done => {
    const users = mount(<Root />).find("#users");
    setTimeout(function() {
      expect(toJson(users)).toMatchSnapshot();
      done();
    }, 10);
  });
});
