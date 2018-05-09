// @flow

import faker from 'faker';
import cookies from 'js-cookie';
import { createAction } from 'redux-actions';

export const setChannels = createAction('CHANNELS_SET');

export const setUserName = createAction('USER_SET_NAME', () => {
  const nameFromCookies = cookies.get('userName');
  const name = nameFromCookies || faker.name.findName();

  if (!nameFromCookies) {
    cookies.set('userName', name);
  }

  return { name };
});
