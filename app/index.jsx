// @flow

import 'bootstrap/dist/css/bootstrap.min.css';

import gon from 'gon';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import { initApp } from './actions';
import App from './components/App';

const root = document.querySelector('#root');

if (root === null) {
  throw new Error('no #root element');
}

/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
/* eslint-enable */

const store = createStore(reducers, devtoolMiddleware);
store.dispatch(initApp(gon));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  root,
);
