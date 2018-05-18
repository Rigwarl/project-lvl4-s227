// @flow

import { createAction } from 'redux-actions';
import { request } from '../server';
import type { InitData, NewMessage, Message, Channel, PopupName } from '../types';

export const initApp = createAction('APP_INIT', (data: InitData) => data);

export const openPopup = createAction('POPUP_OPEN', (name: PopupName, data?: any) => ({ name, data }));

export const closePopup = createAction('POPUP_CLOSE');

export const toggleChannels = createAction('CHANNELS_TOGGLE');

export const changeCurrentChannel = createAction('CHANNEL_CURRENT_CHANGE', (id: number) => id);

export const addMessageEvent = createAction('MESSAGE_ADD_EVENT', (message: Message) => message);
export const addChannelEvent = createAction('CHANNEL_ADD_EVENT', (channel: Channel) => channel);
export const editChannelEvent = createAction('CHANNEL_EDIT_EVENT', (channel: Channel) => channel);
export const removeChannelEvent = createAction('CHANNEL_REMOVE_EVENT', (id: number) => id);

export const addMessage = (message: NewMessage) => () => request.addMessage(message);
export const addChannel = (name: string) => () => request.addChannel(name);
export const editChannel = (channel: Channel) => () => request.editChannel(channel);
export const removeChannel = (id: number) => () => request.removeChannel(id);
