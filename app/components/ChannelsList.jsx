// @flow

import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { channelsSelector } from '../selectors';
import * as actions from '../actions';
import type { State, Channel, ChannelsListStatus } from '../types';

type Props = {|
  status: ChannelsListStatus,
  channels: Channel[],
  currentChannelId: number,
|};

type DispatchProps = {
  changeCurrentChannel: typeof actions.changeCurrentChannel,
  setChannelsList: typeof actions.setChannelsList,
  openPopup: typeof actions.openPopup,
  holdChannel: typeof actions.holdChannel,
};

const mapStateToProps = (state: State): Props => ({
  status: state.channels.listStatus,
  channels: channelsSelector(state),
  currentChannelId: state.channels.currentId,
});

const dispatchToProps: DispatchProps = actions;

const renderChannelListItem = (
  { id, name, removable }, currentChannelId, status,
  changeCurrentChannel, holdChannel,
) => (
  <ListGroupItem
    key={id}
    active={status === 'default' && id === currentChannelId}
    onClick={() => status === 'default' && changeCurrentChannel(id)}
    action={status === 'default'}
    className="d-flex"
  >
    <span className="mr-auto">{name}</span>
    {status !== 'default' && removable &&
      <React.Fragment>
        <Button
          disabled={status === 'disabled'}
          color="link"
          onClick={() => holdChannel(id, 'editChannel')}
          className="pt-0 pb-0 border-0"
        >edit
        </Button>
        <Button
          disabled={status === 'disabled'}
          color="link"
          onClick={() => holdChannel(id, 'removeChannel')}
          className="pt-0 pb-0 border-0"
        >remove
        </Button>
      </React.Fragment>
    }
  </ListGroupItem>
);

const renderButtons = (status, setChannelsList, openPopup) => (
  status !== 'default' ?
    <Button
      disabled={status === 'disabled'}
      color="link"
      onClick={() => setChannelsList('default')}
    >cancel
    </Button>
    :
    <React.Fragment>
      <Button color="link" onClick={() => setChannelsList('editing')}>edit</Button>
      <Button color="link" onClick={() => openPopup('newChannel')}>add</Button>
    </React.Fragment>
);

const ChannelsList = ({
  status, channels, currentChannelId,
  changeCurrentChannel, setChannelsList, openPopup, holdChannel,
}: Props & DispatchProps) => (
  <div>
    <ListGroup>
      {channels.map(channel =>
        renderChannelListItem(
          channel, currentChannelId, status,
          changeCurrentChannel, holdChannel,
        ))}
    </ListGroup>
    {renderButtons(status, setChannelsList, openPopup)}
  </div>
);

export default connect(mapStateToProps, dispatchToProps)(ChannelsList);
