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
  freeChannel: typeof actions.freeChannel,
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
  onRemove = () => this.props.removeChannel(this.props.channel.id)

  onClose = () => this.props.freeChannel(this.props.channel.id)

  render() {
    return (
      <Modal isOpen={this.props.opened} toggle={this.onClose}>
        <ModalHeader toggle={this.onClose}>
          Remove channel {this.props.channel.name}?
        </ModalHeader>
        <ModalBody>
          You will not be able to restore it!
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.onRemove}>Remove</Button>
          <Button color="secondary" onClick={this.onClose}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default connect(mapStateToProps, dispatchProps)(RemoveChannelPopup);
