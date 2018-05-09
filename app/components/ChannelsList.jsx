// @flow

import React from 'react';
import cn from 'classnames';
import type { Channel } from '../types';

export type Props = {|
  channels: Channel[],
  currentChannelId: number,
|};

const renderChannel = ({ id, name }, currentChannelId) => {
  const className = cn({
    'list-group-item': true,
    active: id === currentChannelId,
  });

  return <li key={id} className={className}>{name}</li>;
};

const ChannelsList = ({ channels, currentChannelId }: Props) => (
  <ul className="list-group">
    {channels.map(channel => renderChannel(channel, currentChannelId))}
  </ul>
);

export default ChannelsList;
