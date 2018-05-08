// @flow

import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const channels = handleActions({
  [actions.setChannels]: (state, { payload }) => payload.channels,
}, []);

export default combineReducers({ channels });
