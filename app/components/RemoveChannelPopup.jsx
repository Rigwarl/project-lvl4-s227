// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import * as actions from '../actions';
import type { State, Channel } from '../types';

type Props = {|
  opened: boolean,
  channel: Channel,
|};

type DispatchProps = {
  closePopup: typeof actions.closePopup,
  removeChannel: typeof actions.removeChannel,
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

class RemoveChannelPopup extends React.Component<Props & DispatchProps> {
  onRemove = async () => {
    await this.props.removeChannel(this.props.channel.id);
    this.props.closePopup();
  }

  render() {
    return (
      <Modal isOpen={this.props.opened} toggle={this.props.closePopup}>
        <ModalHeader toggle={this.props.closePopup}>
          Remove channel {this.props.channel.name}?
        </ModalHeader>
        <ModalBody>
          You will not be able to restore it!
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.onRemove}>Remove</Button>
          <Button color="secondary" onClick={this.props.closePopup}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default connect(mapStateToProps, dispatchProps)(RemoveChannelPopup);
