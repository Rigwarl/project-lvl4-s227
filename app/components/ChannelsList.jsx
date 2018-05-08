// @flow

import React from 'react';
import type { Channel } from '../types';

export type Props = {
  channels: Channel[],
  userName: string,
};

const ChannelsList = ({ channels, userName }: Props) => (
  <ul className="list-group">
    <li className="list-group-item"><b>Hello, {userName}!</b></li>
    {channels.map(({ id, name }) =>
      <li key={id} className="list-group-item">{name}</li>)}
  </ul>
);

export default ChannelsList;
