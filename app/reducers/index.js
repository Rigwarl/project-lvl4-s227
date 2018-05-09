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

const currentChannelId = handleActions({
  [actions.initApp]: (state, { payload }) => payload.currentChannelId,
}, 0);

export default combineReducers({
  user,
  channels,
  currentChannelId,
  form: formReducer,
});
