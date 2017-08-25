const nodeFetch = require('node-fetch');

global.fetch = nodeFetch;

import nock from 'nock';
import { combineReducers } from 'redux';

nock('https://foo.com')
  .get('/users')
  .times(100)
  .reply(200, JSON.stringify({ foo: 'bar' }));

const url = 'https://foo.com/users';

import fetchFactory, { apiReducer as reducer } from './fetchFactory';

describe('Fetch factory', () => {
  it('returns selector, reducer, actionCreator', () => {
    const actual = fetchFactory('', '');
    expect(actual.selector).toBeDefined();
    expect(actual.actionCreator).toBeDefined();
  });
});

describe('Reducer', () => {
  it('handles fetch end', () => {
    const action = {
      type: '@API/END',
      payload: {
        name: 'api1',
        data: { foo: 'bar' },
      },
    };

    const actual = combineReducers(reducer)({}, action);
    const expected = {
      api: {
        api1: {
          data: { foo: 'bar' },
        },
      },
    };

    expect(actual).toEqual(expected);
  });
});

describe('Selector', () => {
  it('can get data', () => {
    const { selector } = fetchFactory('api1', url);
    const action = {
      type: '@API/END',
      payload: {
        name: 'api1',
        url: 'url',
        data: { foo: 'bar' },
      },
    };
    const state = combineReducers({ ...reducer })({}, action);
    const actual = selector(state);

    const expected = {
      foo: 'bar',
    };

    expect(actual).toEqual(expected);
  });
});

describe('Action Creator', () => {
  it('is a thunk and dispatchs start', done => {
    const { actionCreator } = fetchFactory('api1', url);
    const mockDispatch = jest.fn();
    actionCreator()({ dispatch: mockDispatch });
    setTimeout(() => {
      expect(mockDispatch.mock.calls[0][0]).toEqual({ type: '@API/START' });
      done();
    }, 10);
  });
  it('is a thunk and dispatchs end', done => {
    const { actionCreator } = fetchFactory('api1', url);
    const mockDispatch = jest.fn();
    actionCreator()({ dispatch: mockDispatch });
    setTimeout(() => {
      expect(mockDispatch.mock.calls[1][0]).toEqual({
        type: '@API/END',
        payload: {
          name: 'api1',
          data: { foo: 'bar' },
        },
      });
      done();
    }, 10);
  });
});
