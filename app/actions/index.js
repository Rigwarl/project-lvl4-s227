// @flow

import faker from 'faker';
import cookies from 'js-cookie';
import { createAction } from 'redux-actions';

export const setChannels = createAction('CHANNELS_SET');

export const setUserName = createAction('USER_NAME_SET', () => {
  const userNameFromCookies = cookies.get('userName');
  const userName = userNameFromCookies || faker.name.findName();

  if (!userNameFromCookies) {
    cookies.set('userName', userName);
  }

  return { userName };
});
