// @flow

import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { render } from 'react-dom';
import App from './App';

const { channels } = window.gon;
const root = document.querySelector('#root');

if (root === null) {
  throw new Error('no #root element');
} else {
  render(<App channels={channels} />, root);
}
