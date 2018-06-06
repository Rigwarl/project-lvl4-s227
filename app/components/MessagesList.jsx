// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { messagesSelector } from '../selectors';
import type { State, Message } from '../types';

type Props = {|
  messages: Message[],
  channelName: string,
|};

const mapStateToProps = (state: State): Props => ({
  messages: messagesSelector(state),
  channelName: state.channels.byId[state.channels.currentId].name,
});

const renderMessageListItem = ({ id, text, userName }) => (
  <Card key={id} className="mb-4">
    <CardBody>
      <CardTitle>{userName}</CardTitle>
      <CardText>{text}</CardText>
    </CardBody>
  </Card>
);

const MessagesList = ({ channelName, messages }: Props) => (
  <div>
    <h2 className="h3 mb-2">
      <span className="font-weight-normal text-muted">#</span>
      {channelName}
    </h2>
    {messages.map(renderMessageListItem)}
  </div>
);

export default connect(mapStateToProps)(MessagesList);
