// @flow

import type { Dispatch } from 'redux';
import { createAction } from 'redux-actions';
import { formValueSelector, reset } from 'redux-form';
import { request } from '../server';
import { openPopup, closePopup } from '.';
import type { Channel, ChannelsListStatus, PopupName } from '../types';

const ERROR_CHANNEL_HOLD_ID = 1;

export const setChannelsList = createAction('CHANNELS_LIST_SET', (status: ChannelsListStatus) => status);
export const changeCurrentChannel = createAction('CHANNEL_CURRENT_CHANGE', (payload: { id: number, currentId: number, currentText: string }) => payload);

export const changeChannel = (id: number) => (dispatch, getStore) => {
  const store = getStore();
  const selector = formValueSelector('newMessage');
  const currentText = selector(store, 'text');
  const { currentId } = store.channels;

  dispatch(changeCurrentChannel({ id, currentId, currentText }));
  dispatch(reset('newMessage'));
};

export const addChannelEvent = createAction('CHANNEL_ADD_EVENT', (channel: Channel) => channel);
export const editChannelEvent = createAction('CHANNEL_EDIT_EVENT', (channel: Channel) => channel);
export const removeChannelEvent = createAction('CHANNEL_REMOVE_EVENT', (id: number) => id);

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

export const addChannel = (name: string, resetForm: Function) => async (dispatch: Dispatch) => {
  await request.addChannel(name);
  resetForm();
  dispatch(closePopup());
};

export const editChannel = (channel: Channel, resetForm: Function) =>
  async (dispatch: Dispatch) => {
    await request.editChannel(channel);
    resetForm();
    dispatch(freeChannel(channel.id));
  };

export const removeChannel = (id: number) => async (dispatch: Dispatch) => {
  await request.removeChannel(id);
  dispatch(freeChannel(id));
};
