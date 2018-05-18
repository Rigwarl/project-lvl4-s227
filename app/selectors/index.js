// @flow

import { createSelector, type OutputSelector } from 'reselect';
import type { State, Channel, Message } from '../types';

// flow error if make this func separate :(
// Object.keys(obj).map(key => obj[key])

export const channelsSelector: OutputSelector<State, void, Channel[]> = createSelector(
  state => state.channels.byId,
  state => state.channels.visible,
  (byId, visible) => visible.map(id => byId[id.toString()]),
);

export const messagesSelector: OutputSelector<State, void, Message[]> = createSelector(
  state => state.messages,
  state => state.channels.currentId,
  (messagesById, currentChannelId) => Object.keys(messagesById)
    .map(key => messagesById[key])
    .filter(({ channelId }) => channelId === currentChannelId),
);
