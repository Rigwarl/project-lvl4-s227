// @flow

import { connect } from 'react-redux';
import { addMessage } from '../actions';
import Component, { type Props } from '../components/NewMessageForm';
import type { State } from '../types';

const mapStateToProps = (state: State): Props => ({
  disabled: state.messageAddingStatus === 'requested',
});
const dispatchProps = { onSubmit: addMessage };
const Container = connect(mapStateToProps, dispatchProps)(Component);

export default Container;
