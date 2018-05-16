// @flow

import { createSelector, type OutputSelector } from 'reselect';
import type { State, Channel, Message } from '../types';

// flow error if make this func separate :(
// Object.keys(obj).map(key => obj[key])

export const channelsSelector: OutputSelector<State, void, Channel[]> = createSelector(
  state => state.channels,
  channelsById => Object.keys(channelsById)
    .map(key => channelsById[key]),
);

export const messagesSelector: OutputSelector<State, void, Message[]> = createSelector(
  state => state.messages,
  state => state.currentChannelId,
  (messagesById, currentChannelId) => Object.keys(messagesById)
    .map(key => messagesById[key])
    .filter(({ channelId }) => channelId === currentChannelId),
);
