// @flow

import gon from 'gon';
import faker from 'faker';
import cookies from 'js-cookie';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import * as actions from './actions';
import { connect } from './server';

export default () => {
  const nameFromCookies = cookies.get('userName');
  const name = nameFromCookies || faker.name.findName();

  if (!nameFromCookies) {
    cookies.set('userName', name);
  }

  const user = { name };
  const data = { ...gon, user };
  const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk)),
  );

  store.dispatch(actions.initApp(data));
  connect(store.dispatch, actions);

  return store;
};
