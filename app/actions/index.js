// @flow

import axios from 'axios';
import { createAction } from 'redux-actions';
import { reset } from 'redux-form';

export const initApp = createAction('APP_INIT');

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addMessage = (message: { text: string }) => async (dispatch, getState) => {
  dispatch(addMessageRequest());
  try {
    const { user } = getState();
    const attributes = { ...message, userName: user.name };

    await axios.post('api/v1/channels/1/messages', { data: { attributes } });

    dispatch(addMessageSuccess());
    dispatch(reset('newMessage'));
  } catch (e) {
    dispatch(addMessageFailure());
  }
};
