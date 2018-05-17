// @flow

import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { channelsSelector } from '../selectors';
import { changeCurrentChannel, toggleChannels, openPopup } from '../actions';
import type { State, Channel } from '../types';

type Props = {|
  editing: boolean,
  channels: Channel[],
  currentChannelId: number,
|};

type DispatchProps = {|
  onChannelClick: typeof changeCurrentChannel,
  toggleEditing: typeof toggleChannels,
  addNewChannel: Function,
|};

const mapStateToProps = (state: State): Props => ({
  editing: state.channelsEditing,
  channels: channelsSelector(state),
  currentChannelId: state.currentChannelId,
});

const dispatchToProps: DispatchProps = {
  onChannelClick: changeCurrentChannel,
  toggleEditing: toggleChannels,
  addNewChannel: () => openPopup('newChannel'),
};

const renderChannelListItem = ({ id, name }, currentChannelId, onChannelClick) => (
  <ListGroupItem
    key={id}
    active={id === currentChannelId}
    onClick={() => onChannelClick(id)}
  >
    {name}
  </ListGroupItem>
);

const renderButtons = (editing, toggleEditing, addNewChannel) => (
  editing ?
    <Button color="link" onClick={toggleEditing}>cancel</Button>
    :
    <React.Fragment>
      <Button color="link" onClick={addNewChannel}>add</Button>
      <Button color="link" onClick={toggleEditing}>edit</Button>
    </React.Fragment>
);

const ChannelsList = ({
  editing, channels, currentChannelId, onChannelClick, toggleEditing, addNewChannel,
}: Props & DispatchProps) => (
  <div>
    <ListGroup>
      {channels.map(channel =>
        renderChannelListItem(channel, currentChannelId, onChannelClick))}
    </ListGroup>
    {renderButtons(editing, toggleEditing, addNewChannel)}
  </div>
);

export default connect(mapStateToProps, dispatchToProps)(ChannelsList);
