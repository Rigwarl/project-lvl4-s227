// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
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

const renderInput = ({ input }): React.Element<any> => <Input {...input} />;

const ChannelForm = ({ id, handleSubmit }) => (
  <form id={id} onSubmit={handleSubmit}>
    <Field name="name" component={renderInput} />
  </form>
);

const ReduxChannelForm = reduxForm({
  form: 'channel',
})(ChannelForm);

const renderNewChannelPopup = (open, close) => (
  <Modal isOpen={open} toggle={close}>
    <ModalHeader toggle={close}>Add new channel</ModalHeader>
    <ModalBody>
      <ReduxChannelForm id="channel" onSubmit={v => console.log(v)} />
    </ModalBody>
    <ModalFooter>
      <Button type="submit" form="channel" color="primary">add</Button>
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

