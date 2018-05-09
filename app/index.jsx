// @flow

import 'bootstrap/dist/css/bootstrap.min.css';

import gon from 'gon';
import faker from 'faker';
import cookies from 'js-cookie';
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { initApp } from './actions';
import App from './components/App';

const root = document.querySelector('#root');

if (root === null) {
  throw new Error('no #root element');
}

const nameFromCookies = cookies.get('userName');
const name = nameFromCookies || faker.name.findName();

if (!nameFromCookies) {
  cookies.set('userName', name);
}

const user = { name };
const data = { ...gon, user };

/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
/* eslint-enable */

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    devtoolMiddleware,
  ),
);
store.dispatch(initApp(data));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  root,
);
