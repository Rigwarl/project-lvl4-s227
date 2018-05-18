// @flow

import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { channelsSelector } from '../selectors';
import * as actions from '../actions';
import type { State, Channel } from '../types';

type Props = {|
  editing: boolean,
  channels: Channel[],
  currentChannelId: number,
|};

type DispatchProps = {
  changeCurrentChannel: typeof actions.changeCurrentChannel,
  toggleChannels: typeof actions.toggleChannels,
  openPopup: typeof actions.openPopup,
};

const mapStateToProps = (state: State): Props => ({
  editing: state.channels.listEditing,
  channels: channelsSelector(state),
  currentChannelId: state.channels.currentId,
});

const dispatchToProps: DispatchProps = actions;

const renderChannelListItem = (
  { id, name, removable }, currentChannelId, editing,
  changeCurrentChannel, openPopup,
) => (
  <ListGroupItem
    key={id}
    active={!editing && id === currentChannelId}
    onClick={() => !editing && changeCurrentChannel(id)}
    action={!editing}
    className="d-flex"
  >
    <span className="mr-auto">{name}</span>
    {editing && removable && <Button color="link">edit</Button>}
    {editing && removable && <Button color="link" onClick={() => openPopup('removeChannel', id)}>remove</Button>}
  </ListGroupItem>
);

const renderButtons = (editing, toggleChannels, openPopup) => (
  editing ?
    <Button color="link" onClick={toggleChannels}>cancel</Button>
    :
    <React.Fragment>
      <Button color="link" onClick={toggleChannels}>edit</Button>
      <Button color="link" onClick={() => openPopup('newChannel')}>add</Button>
    </React.Fragment>
);

const ChannelsList = ({
  editing, channels, currentChannelId,
  changeCurrentChannel, toggleChannels, openPopup,
}: Props & DispatchProps) => (
  <div>
    <ListGroup>
      {channels.map(channel =>
        renderChannelListItem(
          channel, currentChannelId, editing,
          changeCurrentChannel, openPopup,
        ))}
    </ListGroup>
    {renderButtons(editing, toggleChannels, openPopup)}
  </div>
);

export default connect(mapStateToProps, dispatchToProps)(ChannelsList);
