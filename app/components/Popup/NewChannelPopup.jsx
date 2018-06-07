// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, Button, Input, FormGroup, FormFeedback } from 'reactstrap';
import { Field, reduxForm, type FormProps } from 'redux-form';
import { closePopup, addChannel } from '../../actions';
import { required } from '../../validation';
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

const renderNameFiled = ({ input, meta: { touched, error } }): React.Element<any> => (
  <FormGroup>
    <Input
      {...input}
      placeholder="channel name"
      invalid={touched && !!error}
    />
    <FormFeedback>{error}</FormFeedback>
  </FormGroup>
);

const validateName = required('Channel name');

class NewChannelPopup extends React.Component<Props & DispatchProps & FormProps> {
  onSubmit = ({ name }) => this.props.addChannel(name, this.props.reset)

  render() {
    return (
      <Modal isOpen={this.props.opened} toggle={this.props.closePopup}>
        <ModalHeader toggle={this.props.closePopup}>Add channel</ModalHeader>
        <ModalBody>
          <Form id="channel-new-form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Field
              name="name"
              component={renderNameFiled}
              validate={validateName}
            />
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            form="channel-new-form"
            type="submit"
            color="primary"
            disabled={this.props.submitting}
          >add
          </Button>
          <Button
            color="secondary"
            onClick={this.props.closePopup}
            disabled={this.props.submitting}
          >Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default connect(mapStateToProps, dispatchProps)(reduxForm({
  form: 'newChannel',
})(NewChannelPopup));
