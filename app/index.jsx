// @flow

import 'bootstrap/dist/css/bootstrap.min.css';

import faker from 'faker';
import cookies from 'js-cookie';
import React from 'react';
import { render } from 'react-dom';

import App from './App';

const nameFromCookies = cookies.get('name');
const name = nameFromCookies || faker.name.findName();

if (!nameFromCookies) {
  cookies.set('name', name);
}

const { channels } = window.gon;
const root = document.querySelector('#root');

if (root === null) {
  throw new Error('no #root element');
} else {
  render(<App channels={channels} />, root);
}
