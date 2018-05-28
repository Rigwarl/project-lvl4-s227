// @flow

import type { Dispatch } from 'redux';
import { createAction } from 'redux-actions';
import { request } from '../server';
import { openPopup, closePopup } from '.';
import type { Channel, ChannelsListStatus, PopupName } from '../types';

const ERROR_CHANNEL_HOLD_ID = 1;

export const setChannelsList = createAction('CHANNELS_LIST_SET', (status: ChannelsListStatus) => status);
export const changeCurrentChannel = createAction('CHANNEL_CURRENT_CHANGE', (id: number) => id);

export const addChannelEvent = createAction('CHANNEL_ADD_EVENT', (channel: Channel) => channel);
export const editChannelEvent = createAction('CHANNEL_EDIT_EVENT', (channel: Channel) => channel);
export const removeChannelEvent = createAction('CHANNEL_REMOVE_EVENT', (id: number) => id);

export const addChannel = (name: string) => () => request.addChannel(name);
export const editChannel = (channel: Channel) => () => request.editChannel(channel);
export const removeChannel = (id: number) => () => request.removeChannel(id);

export const holdChannel = (id: number, popup: PopupName) => async (dispatch: Dispatch) => {
  dispatch(setChannelsList('disabled'));

  try {
    await request.holdChannel(id);
    dispatch(openPopup(popup, id));
  } catch (e) {
    if (e.id === ERROR_CHANNEL_HOLD_ID) {
      dispatch(openPopup('blockedChannel', id));
    }
  }

  dispatch(setChannelsList('editing'));
};

export const freeChannel = (id: number) => async (dispatch: Dispatch) => {
  dispatch(setChannelsList('default'));
  dispatch(closePopup());
  await request.freeChannel(id);
};
