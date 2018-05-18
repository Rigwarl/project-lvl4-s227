// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, Button, Input } from 'reactstrap';
import { Field, reduxForm, type FormProps } from 'redux-form';
import { closePopup, addChannel } from '../../actions';
import type { State } from '../../types';

type Props = {|
  opened: boolean,
|};

type DispatchProps = {|
  closePopup: typeof closePopup,
  addChannel: typeof addChannel,
|};

const mapStateToProps = (state: State): Props => ({
  opened: state.popup.open,
});

const dispatchProps: DispatchProps = {
  addChannel,
  closePopup,
};

const renderInput = ({ input }): React.Element<any> => <Input {...input} placeholder="channel name" />;

class NewChannelPopup extends React.Component<Props & DispatchProps & FormProps> {
  onSubmit = async ({ name }) => {
    await this.props.addChannel(name);
    this.props.reset();
    this.props.closePopup();
  }

  render() {
    return (
      <Modal isOpen={this.props.opened} toggle={this.props.closePopup}>
        <ModalHeader toggle={this.props.closePopup}>Add channel</ModalHeader>
        <ModalBody>
          <Form id="channel-form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Field name="name" component={renderInput} />
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button form="channel-form" type="submit" color="primary">add</Button>
          <Button color="secondary" onClick={this.props.closePopup}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default connect(mapStateToProps, dispatchProps)(reduxForm({
  form: 'newChannel',
})(NewChannelPopup));
