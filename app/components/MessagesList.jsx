// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import cn from 'classnames';
import { messagesSelector } from '../selectors';
import type { State, Message } from '../types';

type Props = {|
  messages: Message[],
  channelId: number,
|};

const mapStateToProps = (state: State): Props => ({
  messages: messagesSelector(state),
  channelId: state.channels.currentId,
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

class MessagesList extends React.Component<Props> {
  componentDidUpdate(prevProps) {
    if (
      this.props.channelId !== prevProps.channelId ||
      this.props.messages !== prevProps.messages
    ) {
      if (!this.listInputRef) {
        throw new Error('listInputRef undefined!');
      }

      this.listInputRef.scrollTop = this.listInputRef.scrollHeight;
    }
  }

  listInputRef: ?HTMLDivElement

  render() {
    const className = cn({
      'messages-list': true,
      'mb-4': this.props.messages.length > 0,
    });

    return (
      <div
        tabIndex="0" // eslint-disable-line
        className={className}
        ref={(list) => { this.listInputRef = list; }}
      >
        {this.props.messages.map(renderMessageListItem)}
      </div>
    );
  }
}

export default connect(mapStateToProps)(MessagesList);
