import React from 'react';
import { mount } from 'enzyme';
import App from './App';

describe('App', () => {
  it('renders list of users', () => {
    const app = mount(<App />);
    console.log('app.html(): ', app.html());
  });
});
