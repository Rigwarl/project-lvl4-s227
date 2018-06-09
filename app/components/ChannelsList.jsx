// @flow

import React from 'react';
import { connect } from 'react-redux';
import { HotKeys } from 'react-hotkeys';
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
  changeChannel: typeof actions.changeChannel,
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
) => {
  const active = status === 'default' && id === currentChannelId;
  const canActivate = status === 'default' && id !== currentChannelId;
  const tabIndex = canActivate ? 0 : -1;

  const removeChannel = () => holdChannel(id, 'removeChannel');
  const editChannel = () => holdChannel(id, 'editChannel');
  const setCurrentChannel = () => canActivate && changeCurrentChannel(id);
  const handlers = canActivate ? { setCurrentChannel } : {};

  return (
    <ListGroupItem
      key={id}
      active={active}
      onClick={setCurrentChannel}
      action={status === 'default'}
      className="p-0"
    >
      <HotKeys
        handlers={handlers}
        tabIndex={tabIndex}
        className="d-flex px-3 py-2"
      >
        <span className="mr-auto">{name}</span>
        {status !== 'default' && removable &&
          <React.Fragment>
            <Button
              disabled={status === 'disabled'}
              color="link"
              onClick={editChannel}
              className="pt-0 pb-0 border-0"
            >edit
            </Button>
            <Button
              disabled={status === 'disabled'}
              color="link"
              onClick={removeChannel}
              className="pt-0 pb-0 border-0"
            >remove
            </Button>
          </React.Fragment>
        }
      </HotKeys>
    </ListGroupItem>
  );
};

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
  changeChannel, setChannelsList, openPopup, holdChannel,
}: Props & DispatchProps) => {
  const cancelEditing = () => status === 'editing' && setChannelsList('default');

  return (
    <HotKeys
      keyMap={{
        setCurrentChannel: 'enter',
        cancelEditing: 'esc',
      }}
      handlers={{ cancelEditing }}
      focused
      attach={window}
    >
      <div className="pt-3">
        <h1 className="h3 mb-2">Slack Killer</h1>
        <ListGroup>
          {channels.map(channel =>
            renderChannelListItem(
              channel, currentChannelId, status,
              changeChannel, holdChannel,
            ))}
        </ListGroup>
        {renderButtons(status, setChannelsList, openPopup)}
      </div>
    </HotKeys>
  );
};
export default connect(mapStateToProps, dispatchToProps)(ChannelsList);
