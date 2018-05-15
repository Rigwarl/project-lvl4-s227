// @flow

import { createAction } from 'redux-actions';
import { request } from '../server';
import type { State, NewMessage, Message } from '../types';

export const initApp = createAction('APP_INIT', (state: State) => state);

export const addMessageEvent = createAction('MESSAGE_ADD_EVENT', (message: Message) => message);

export const addMessage = (message: NewMessage) => () => request.addMessage(message);
