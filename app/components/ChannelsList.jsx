// @flow

import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { channelsSelector } from '../selectors';
import { changeCurrentChannel } from '../actions';
import type { State, Channel } from '../types';

type Props = {|
  channels: Channel[],
  currentChannelId: number,
|};

type DispatchProps = {|
  onChannelClick: typeof changeCurrentChannel,
|};

const mapStateToProps = (state: State): Props => ({
  channels: channelsSelector(state),
  currentChannelId: state.currentChannelId,
});

const dispatchToProps: DispatchProps = { onChannelClick: changeCurrentChannel };

const renderChannelItem = ({ id, name }, currentChannelId, onChannelClick) => (
  <ListGroupItem
    key={id}
    active={id === currentChannelId}
    onClick={() => onChannelClick(id)}
  >
    {name}
  </ListGroupItem>
);

const ChannelsList = ({ channels, currentChannelId, onChannelClick }: Props & DispatchProps) => (
  <ListGroup>
    {channels.map(channel => renderChannelItem(channel, currentChannelId, onChannelClick))}
  </ListGroup>
);

export default connect(mapStateToProps, dispatchToProps)(ChannelsList);
