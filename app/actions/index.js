// @flow

import { createAction } from 'redux-actions';
import { request } from '../server';
import type { InitData, NewMessage, Message } from '../types';

export const initApp = createAction('APP_INIT', (data: InitData) => data);

export const changeCurrentChannel = createAction('CHANNEL_CURRENT_CHANGE', (id: number) => id);

export const channelsListAdd = createAction('CHANNELS_LIST_ADD');
export const channelsListEdit = createAction('CHANNELS_LIST_EDIT');
export const channelsListDefault = createAction('CHANNELS_LIST_DEFAULT');

export const addMessageEvent = createAction('MESSAGE_ADD_EVENT', (message: Message) => message);

export const addMessage = (message: NewMessage) => () => request.addMessage(message);
