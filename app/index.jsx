// @flow

import 'bootstrap/dist/css/bootstrap.min.css';

import faker from 'faker';
import cookies from 'js-cookie';
import React from 'react';
import { render } from 'react-dom';
import { channels } from 'gon';
import App from './App';

const userNameFromCookies = cookies.get('userName');
const userName = userNameFromCookies || faker.name.findName();

if (!userNameFromCookies) {
  cookies.set('userName', userName);
}

const root = document.querySelector('#root');

if (root === null) {
  throw new Error('no #root element');
} else {
  render(<App channels={channels} userName={userName} />, root);
}
