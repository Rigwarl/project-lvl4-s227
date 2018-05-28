// @flow

import { createAction } from 'redux-actions';
import { request } from '../server';
import type { InitData, NewMessage, Message, PopupName } from '../types';

export * from './channels';

export const initApp = createAction('APP_INIT', (data: InitData) => data);

export const openPopup = createAction('POPUP_OPEN', (name: PopupName, data?: any) => ({ name, data }));
export const closePopup = createAction('POPUP_CLOSE');

export const addMessageEvent = createAction('MESSAGE_ADD_EVENT', (message: Message) => message);

export const addMessage = (message: NewMessage) => () => request.addMessage(message);
