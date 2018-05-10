// @flow

import { createAction } from 'redux-actions';
import { reset } from 'redux-form';
import { request } from '../server';

export const initApp = createAction('APP_INIT');

export const addMessageEvent = createAction('MESSAGE_ADD_EVENT');

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addMessage = (message: { text: string }) => async (dispatch, getState) => {
  dispatch(addMessageRequest());
  try {
    const { user, currentChannelId } = getState();
    const attributes = {
      ...message,
      userName: user.name,
      channelId: currentChannelId,
    };

    await request('addMessage', attributes);

    dispatch(addMessageSuccess());
    dispatch(reset('newMessage'));
  } catch (e) {
    dispatch(addMessageFailure());
  }
};
