// @flow

import { createAction } from 'redux-actions';
import { request } from '../server';
import type { InitData, NewMessage, Message, PopupName } from '../types';

export const initApp = createAction('APP_INIT', (data: InitData) => data);

export const openPopup = createAction('POPUP_OPEN', (name: PopupName) => name);

export const closePopup = createAction('POPUP_CLOSE');

export const toggleChannels = createAction('CHANNELS_TOGGLE');

export const changeCurrentChannel = createAction('CHANNEL_CURRENT_CHANGE', (id: number) => id);

export const addMessageEvent = createAction('MESSAGE_ADD_EVENT', (message: Message) => message);

export const addMessage = (message: NewMessage) => () => request.addMessage(message);

export const addChannel = (name: string) => () => request.addChannel(name);
