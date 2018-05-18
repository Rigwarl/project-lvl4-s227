// @flow

import _ from 'lodash';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { handleActions, type ActionType } from 'redux-actions';
import * as actions from '../actions';
import type { ChannelsMap, MessagesMap, User, Popup } from '../types';

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
}, {});

const channels = handleActions({
  [actions.initApp.toString()](
    state: ChannelsMap,
    action: ActionType<typeof actions.initApp>,
  ): ChannelsMap {
    const { payload } = action;
    const channelsById = _.keyBy(payload.channels, 'id');

    return { ...channelsById };
  },

  [actions.addChannelEvent.toString()](
    state: ChannelsMap,
    action: ActionType<typeof actions.addChannelEvent>,
  ): ChannelsMap {
    const { payload } = action;

    return { ...state, [payload.id]: payload };
  },
}, {});

const channelsEditing = handleActions({
  [actions.toggleChannels.toString()](state: boolean): boolean {
    return !state;
  },
}, false);

const currentChannelId = handleActions({
  [actions.initApp.toString()](
    state: number,
    action: ActionType<typeof actions.initApp>,
  ): number {
    const { payload } = action;

    return payload.currentChannelId;
  },

  [actions.changeCurrentChannel.toString()](
    state: number,
    action: ActionType<typeof actions.changeCurrentChannel>,
  ): number {
    const { payload } = action;

    return payload;
  },
}, 0);

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
  channelsEditing,
  currentChannelId,
  popup,
  form: formReducer,
});
