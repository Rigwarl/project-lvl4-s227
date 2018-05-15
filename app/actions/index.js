// @flow

import { createAction } from 'redux-actions';
import { request } from '../server';
import type { InitData, NewMessage, Message } from '../types';

export const initApp = createAction('APP_INIT', (data: InitData) => data);

export const addMessageEvent = createAction('MESSAGE_ADD_EVENT', (message: Message) => message);

export const addMessage = (message: NewMessage) => () => request.addMessage(message);
