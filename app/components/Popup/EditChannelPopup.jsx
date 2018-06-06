// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, Button, Input } from 'reactstrap';
import { Field, reduxForm, type FormProps } from 'redux-form';
import { freeChannel, editChannel } from '../../actions';
import type { State, Channel } from '../../types';

type Props = {|
  opened: boolean,
  channel: Channel,
  initialValues: { name: string },
|};

type DispatchProps = {|
  freeChannel: typeof freeChannel,
  editChannel: typeof editChannel,
|};

const mapStateToProps = (state: State): Props => {
  if (typeof state.popup.data !== 'number') {
    throw new Error('Edit Channel Popup need channelId as data prop');
  }

  const channel = state.channels.byId[state.popup.data];

  return {
    channel,
    opened: state.popup.open,
    initialValues: { name: channel.name },
  };
};

const dispatchProps: DispatchProps = {
  editChannel,
  freeChannel,
};

const renderInput = ({ input }): React.Element<any> => <Input {...input} placeholder="channel name" />;

class NewChannelPopup extends React.Component<Props & DispatchProps & FormProps> {
  onSubmit = ({ name }) => this.props.editChannel({ ...this.props.channel, name }, this.props.reset)

  onClose = () => this.props.freeChannel(this.props.channel.id)

  render() {
    return (
      <Modal isOpen={this.props.opened} toggle={this.onClose}>
        <ModalHeader toggle={this.onClose}>
          Edit channel {this.props.channel.name}
        </ModalHeader>
        <ModalBody>
          <Form id="channel-edit-form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Field name="name" component={renderInput} />
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            form="channel-edit-form"
            type="submit"
            color="primary"
            disabled={this.props.submitting}
          >save
          </Button>
          <Button
            color="secondary"
            onClick={this.onClose}
            disabled={this.props.submitting}
          >Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default connect(mapStateToProps, dispatchProps)(reduxForm({
  form: 'editChannel',
})(NewChannelPopup));
