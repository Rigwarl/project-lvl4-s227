// @flow

import { connect } from 'react-redux';
import { addMessage } from '../actions';
import Component from '../components/NewMessageForm';

const Container = connect(null, { onSubmit: addMessage })(Component);

export default Container;
