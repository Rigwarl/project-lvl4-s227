// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import cn from 'classnames';
import { messagesSelector } from '../selectors';
import type { State, Message } from '../types';

type Props = {|
  messages: Message[],
|};

const mapStateToProps = (state: State): Props => ({
  messages: messagesSelector(state),
});

const renderMessageListItem = ({ id, text, userName }, i, messages) => {
  const className = cn({
    'mb-4': i !== messages.length - 1,
  });

  return (
    <Card key={id} className={className}>
      <CardBody>
        <CardTitle>{userName}</CardTitle>
        <CardText>{text}</CardText>
      </CardBody>
    </Card>
  );
};

const MessagesList = ({ messages }: Props) => (
  <div className="messages-list mb-4">
    {messages.map(renderMessageListItem)}
  </div>
);

export default connect(mapStateToProps)(MessagesList);
