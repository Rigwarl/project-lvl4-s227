// @flow

import _ from 'lodash';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { handleActions, type ActionType } from 'redux-actions';
import * as actions from '../actions';
import type { ChannelsMap, MessagesMap, User } from '../types';

const user = handleActions({
  [actions.initApp.toString()](
    state: User,
    action: ActionType<typeof actions.initApp>,
  ): User {
    const { payload: { user: { name } } } = action;

    return { ...state, name };
  },
}, { name: '' });

const channels = handleActions({
  [actions.initApp.toString()](
    state: ChannelsMap,
    action: ActionType<typeof actions.initApp>,
  ): ChannelsMap {
    const { payload } = action;
    const channelsById = _.keyBy(payload.channels, 'id');

    return { ...channelsById };
  },
}, {});

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

const currentChannelId = handleActions({
  [actions.initApp.toString()](
    state: number,
    action: ActionType<typeof actions.initApp>,
  ) {
    const { payload } = action;

    return payload.currentChannelId;
  },
}, 0);

export default combineReducers({
  user,
  channels,
  messages,
  currentChannelId,
  form: formReducer,
});
