// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import * as actions from '../../actions';
import type { State, Channel } from '../../types';

type Props = {|
  opened: boolean,
  channel: Channel,
|};

type DispatchProps = {
  closePopup: typeof actions.closePopup,
};

const mapStateToProps = (state: State): Props => {
  if (typeof state.popup.data !== 'number') {
    throw new Error('Remove Channel Popup need channelId as data prop');
  }

  return {
    opened: state.popup.open,
    channel: state.channels.byId[state.popup.data],
  };
};

const dispatchProps: DispatchProps = actions;

const RemoveChannelPopup = ({
  opened, channel, closePopup,
}: Props & DispatchProps) => (
  <Modal isOpen={opened} toggle={closePopup}>
    <ModalHeader toggle={closePopup}>
      Channel {channel.name} is editing by another user.
    </ModalHeader>
    <ModalBody>
      Try again later.
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={closePopup}>Ok</Button>
    </ModalFooter>
  </Modal>
);

export default connect(mapStateToProps, dispatchProps)(RemoveChannelPopup);
