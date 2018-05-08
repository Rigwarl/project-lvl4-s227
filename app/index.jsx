// @flow

import 'bootstrap/dist/css/bootstrap.min.css';

import faker from 'faker';
import cookies from 'js-cookie';
import { channels } from 'gon';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import { setChannels } from './actions';
import App from './App';

const userNameFromCookies = cookies.get('userName');
const userName = userNameFromCookies || faker.name.findName();

if (!userNameFromCookies) {
  cookies.set('userName', userName);
}

const root = document.querySelector('#root');

if (root === null) {
  throw new Error('no #root element');
}

/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
/* eslint-enable */

const store = createStore(reducers, devtoolMiddleware);
store.dispatch(setChannels({ channels }));

render(
  <Provider store={store}>
    <App channels={channels} userName={userName} />
  </Provider>,
  root,
);
