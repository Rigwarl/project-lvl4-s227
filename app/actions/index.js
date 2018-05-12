// @flow

import { createAction } from 'redux-actions';
import { request } from '../server';

export const initApp = createAction('APP_INIT');

export const addMessageEvent = createAction('MESSAGE_ADD_EVENT');

export const addMessage = message => () => request.addMessage(message);
