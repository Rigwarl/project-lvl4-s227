// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { messagesSelector } from '../selectors';
import type { State, Message } from '../types';

type Props = {|
  messages: Message[],
|};

const mapStateToProps = (state: State): Props => ({
  messages: messagesSelector(state),
});

const renderMessageListItem = ({ id, text, userName }) => (
  <Card key={id} className="mb-4">
    <CardBody>
      <CardTitle>{userName}</CardTitle>
      <CardText>{text}</CardText>
    </CardBody>
  </Card>
);

const MessagesList = ({ messages }: Props) => (
  <div className="messages-list">
    {messages.map(renderMessageListItem)}
  </div>
);

export default connect(mapStateToProps)(MessagesList);
