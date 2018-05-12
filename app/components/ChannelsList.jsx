// @flow

import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { channelsSelector } from '../selectors';
import type { State, Channel } from '../types';

export type Props = {|
  channels: Channel[],
  currentChannelId: number,
|};

const mapStateToProps = (state: State): Props => ({
  channels: channelsSelector(state),
  currentChannelId: state.currentChannelId,
});

const renderChannelItem = ({ id, name }, currentChannelId) => {
  const className = cn({
    'list-group-item': true,
    active: id === currentChannelId,
  });

  return <li key={id} className={className}>{name}</li>;
};

const ChannelsList = ({ channels, currentChannelId }: Props) => (
  <ul className="list-group">
    {channels.map(channel => renderChannelItem(channel, currentChannelId))}
  </ul>
);

export default connect(mapStateToProps)(ChannelsList);
