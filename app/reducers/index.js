import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const userName = handleActions({
  [actions.setUserName]: (state, { payload }) => payload.userName,
}, '');

const channels = handleActions({
  [actions.setChannels]: (state, { payload }) => payload.channels,
}, []);

export default combineReducers({ userName, channels });
