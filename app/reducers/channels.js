import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions, type ActionType } from 'redux-actions';
import * as actions from '../actions';
import type { ChannelsMap } from '../types';

const GENERAL_CHANNEL_ID = 1;

const byId = handleActions({
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

const visible = handleActions({
  [actions.initApp.toString()](
    state: number[],
    action: ActionType<typeof actions.initApp>,
  ): ChannelsMap {
    const { payload } = action;

    return payload.channels.map(({ id }) => id);
  },

  [actions.addChannelEvent.toString()](
    state: number[],
    action: ActionType<typeof actions.addChannelEvent>,
  ): ChannelsMap {
    const { payload } = action;

    return [...state, payload.id];
  },

  [actions.removeChannelEvent.toString()](
    state: number[],
    action: ActionType<typeof actions.removeChannelEvent>,
  ): ChannelsMap {
    const { payload } = action;

    return state.filter(id => id !== payload);
  },
}, []);

const listEditing = handleActions({
  [actions.toggleChannels.toString()](state: boolean): boolean {
    return !state;
  },

  [actions.closePopup.toString()](): boolean {
    return false;
  },
}, false);

const currentId = handleActions({
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

  [actions.removeChannelEvent.toString()](
    state: number[],
    action: ActionType<typeof actions.removeChannelEvent>,
  ): ChannelsMap {
    const { payload } = action;

    return state === payload ? GENERAL_CHANNEL_ID : state;
  },
}, GENERAL_CHANNEL_ID);

export default combineReducers({
  byId,
  visible,
  currentId,
  listEditing,
});
