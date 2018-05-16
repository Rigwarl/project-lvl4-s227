// @flow

import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
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

const renderChannelItem = ({ id, name }, currentChannelId, onChannelClick) => {
  const active = id === currentChannelId;
  const className = cn({
    'list-group-item': true,
    active,
  });

  return (
    <li
      key={id}
      role="menuitemradio"
      aria-checked={active}
      className={className}
      onClick={() => onChannelClick(id)}
    >
      {name}
    </li>
  );
};

const ChannelsList = ({ channels, currentChannelId, onChannelClick }: Props & DispatchProps) => (
  <ul className="list-group" role="menu">
    {channels.map(channel => renderChannelItem(channel, currentChannelId, onChannelClick))}
  </ul>
);

export default connect(mapStateToProps, dispatchToProps)(ChannelsList);
