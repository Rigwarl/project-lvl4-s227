import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const user = handleActions({
  [actions.setUserName]: (state, { payload: { name } }) => ({ ...state, name }),
}, '');

const channels = handleActions({
  [actions.setChannels]: (state, { payload }) => _.keyBy(payload.channels, 'id'),
}, []);

export default combineReducers({ user, channels });
