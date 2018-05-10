// @flow

import { connect } from 'react-redux';
import Component from '../components/MessagesList';
import { messagesSelector } from '../selectors';
import type { Props } from '../components/MessagesList';
import type { State } from '../types';

const mapStateToProps = (state: State): Props => ({
  messages: messagesSelector(state),
});
const Container = connect(mapStateToProps)(Component);

export default Container;
