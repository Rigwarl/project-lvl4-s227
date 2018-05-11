import _ from 'lodash';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const user = handleActions({
  [actions.initApp]: (state, { payload: { user: { name } } }) => ({ ...state, name }),
}, {});

const channels = handleActions({
  [actions.initApp]: (state, { payload }) => _.keyBy(payload.channels, 'id'),
}, {});

const messages = handleActions({
  [actions.initApp]: (state, { payload }) => _.keyBy(payload.messages, 'id'),
  [actions.addMessageEvent]: (state, { payload: { id, message } }) => ({ ...state, [id]: message }),
}, {});

const messageAddingStatus = handleActions({
  [actions.addMessageRequest]: () => 'requested',
  [actions.addMessageFailure]: () => 'failed',
  [actions.addMessageSuccess]: () => 'successed',
}, 'none');

const currentChannelId = handleActions({
  [actions.initApp]: (state, { payload }) => payload.currentChannelId,
}, 0);

export default combineReducers({
  user,
  channels,
  messages,
  currentChannelId,
  messageAddingStatus,
  form: formReducer,
});
