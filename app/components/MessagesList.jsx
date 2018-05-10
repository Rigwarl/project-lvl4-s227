// @flow

import React from 'react';
import type { Message } from '../types';

export type Props = {
  messages: Message[],
}

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

export default MessagesList;
