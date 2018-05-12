// @flow

import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import createStore from './store';

const root = document.getElementById('root');
const store = createStore();

if (root === null) {
  throw new Error('no #root element');
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  root,
);
