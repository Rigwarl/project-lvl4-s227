// @flow

import 'bootstrap/dist/css/bootstrap.min.css';

import { channels } from 'gon';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import { setChannels, setUserName } from './actions';
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
store.dispatch(setChannels({ channels }));
store.dispatch(setUserName());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  root,
);
