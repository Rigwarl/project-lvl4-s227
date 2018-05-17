// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { closePopup } from '../actions';
import type { State, Popup as PopupType } from '../types';

type Props = {|
  popup: PopupType,
|};

type DispatchProps = {|
  close: typeof closePopup,
|};

const mapStateToProps = (state: State): Props => ({
  popup: state.popup,
});

const dispatchToProps = { close: closePopup };

const renderNewChannelPopup = (open, close) => (
  <Modal isOpen={open} toggle={close}>
    <ModalHeader toggle={close}>Add new channel</ModalHeader>
    <ModalBody>
      form here
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={close}>add</Button>
      <Button color="secondary" onClick={close}>Cancel</Button>
    </ModalFooter>
  </Modal>
);

const Popup = ({ popup: { name, open }, close }: Props & DispatchProps) => {
  switch (name) {
    case 'newChannel':
      return renderNewChannelPopup(open, close);
    case 'none':
    default:
      return null;
  }
};

export default connect(mapStateToProps, dispatchToProps)(Popup);

