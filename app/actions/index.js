// @flow

import faker from 'faker';
import cookies from 'js-cookie';
import { createAction } from 'redux-actions';

export const initApp = createAction('APP_INIT', (data) => {
  const nameFromCookies = cookies.get('userName');
  const name = nameFromCookies || faker.name.findName();

  if (!nameFromCookies) {
    cookies.set('userName', name);
  }

  const user = { name };

  return { ...data, user };
});
