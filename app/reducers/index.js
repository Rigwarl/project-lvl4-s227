// @flow

import _ from 'lodash';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { handleActions, type ActionType } from 'redux-actions';
import * as actions from '../actions';
import channels from './channels';
import type { MessagesMap, User, Popup } from '../types';

const user = handleActions({
  [actions.initApp.toString()](
    state: User,
    action: ActionType<typeof actions.initApp>,
  ): User {
    const { payload: { user: { name } } } = action;

    return { ...state, name };
  },
}, { name: '' });

const messages = handleActions({
  [actions.initApp.toString()](
    state: MessagesMap,
    action: ActionType<typeof actions.initApp>,
  ): MessagesMap {
    const { payload } = action;
    const messagesById = _.keyBy(payload.messages, 'id');

    return { ...messagesById };
  },

  [actions.addMessageEvent.toString()](
    state: MessagesMap,
    action: ActionType<typeof actions.addMessageEvent>,
  ): MessagesMap {
    const { payload } = action;

    return { ...state, [payload.id]: payload };
  },

  [actions.removeChannelEvent.toString()](
    state: MessagesMap,
    action: ActionType<typeof actions.removeChannelEvent>,
  ): MessagesMap {
    const { payload } = action;

    return _.omitBy({ ...state }, ({ channelId }) => channelId === payload);
  },
}, {});


const popup = handleActions({
  [actions.openPopup.toString()](
    state: Popup,
    action: ActionType<typeof actions.openPopup>,
  ): Popup {
    const { payload } = action;

    return {
      ...payload,
      open: true,
    };
  },

  [actions.closePopup.toString()](state: Popup): Popup {
    return {
      ...state,
      open: false,
    };
  },
}, { name: 'none', open: false });

export default combineReducers({
  user,
  messages,
  channels,
  popup,
  form: formReducer,
});
