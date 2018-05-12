// @flow

import React from 'react';
import { connect } from 'react-redux';
import { messagesSelector } from '../selectors';
import type { State, Message } from '../types';

export type Props = {
  messages: Message[],
}

const mapStateToProps = (state: State): Props => ({
  messages: messagesSelector(state),
});

const renderMessageListItem = ({ id, text, userName }) => (
  <div key={id} className="card mb-4">
    <div className="card-body">
      <b className="card-title">{userName}</b>
      <p className="card-text">{text}</p>
    </div>
  </div>
);

const MessagesList = ({ messages }: Props) => (
  <div>
    {messages.map(renderMessageListItem)}
  </div>
);

export default connect(mapStateToProps)(MessagesList);
