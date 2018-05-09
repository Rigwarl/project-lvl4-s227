// @flow
import axios from 'axios';
import { createAction } from 'redux-actions';
import { reset } from 'redux-form';
import type { Dispatch } from 'redux';
import type { Message } from '../types';

export const initApp = createAction('APP_INIT');

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addMessage = (message: Message) => async (dispatch: Dispatch) => {
  dispatch(addMessageRequest());
  try {
    const response = await axios.post('/', { message });
    dispatch(addMessageSuccess({ task: response.data }));
    dispatch(reset('newMessage'));
  } catch (e) {
    dispatch(addMessageFailure());
  }
};
