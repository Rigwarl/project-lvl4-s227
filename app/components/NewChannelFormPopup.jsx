// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, Button, Input } from 'reactstrap';
import { Field, reduxForm, type FormProps } from 'redux-form';
import { closePopup } from '../actions';
import type { State } from '../types';

type Props = {|
  opened: boolean,
|};

type DispatchProps = {|
  close: typeof closePopup,
|};

const mapStateToProps = (state: State): Props => ({
  opened: state.popup.open,
});

const dispatchProps: DispatchProps = { close: closePopup };

const renderInput = ({ input }): React.Element<any> => <Input {...input} placeholder="channel name" />;

class NewChannelFormPopup extends React.Component<Props & DispatchProps & FormProps> {
  onSubmit = async (v) => {
    console.log(v);
    this.props.reset();
  }

  render() {
    return (
      <Modal isOpen={this.props.opened} toggle={this.props.close}>
        <ModalHeader toggle={this.props.close}>Add channel</ModalHeader>
        <ModalBody>
          <Form id="channel-form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Field name="name" component={renderInput} />
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button form="channel-form" type="submit" color="primary">add</Button>
          <Button color="secondary" onClick={this.props.close}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default connect(mapStateToProps, dispatchProps)(reduxForm({
  form: 'newChannel',
})(NewChannelFormPopup));
