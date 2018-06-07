// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, type FormProps } from 'redux-form';
import { Form, FormGroup, Button, Input, FormFeedback } from 'reactstrap';
import { addMessage } from '../actions';
import { required } from '../validation';
import type { State } from '../types';

export type Props = {|
  userName: string,
  channelId: number,
  initialValues: { text: string },
|} & FormProps;

const mapStateToProps = (state: State): Props => ({
  userName: state.user.name,
  channelId: state.channels.currentId,
  initialValues: { text: state.channels.texts[state.channels.currentId] },
});

const renderMessageField = ({ input, meta: { touched, error } }): React.Element<any> => (
  <FormGroup>
    <Input
      {...input}
      invalid={touched && !!error}
      type="textarea"
      rows="3"
      placeholder="Input message"
    />
    <FormFeedback>{error}</FormFeedback>
  </FormGroup>
);

const validateMessage = required('Message');

class NewMessageForm extends React.Component<Props> {
  onSubmit = async ({ text }) => {
    const { userName, channelId } = this.props;
    const message = { text, userName, channelId };

    await this.props.addMessage(message);
    this.props.reset();
  }

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field
          name="text"
          component={renderMessageField}
          disabled={this.props.submitting}
          validate={validateMessage}
        />
        <Button
          disabled={this.props.submitting}
          type="submit"
          color="primary"
        >Send
        </Button>
      </Form>
    );
  }
}

const ReduxForm = reduxForm({
  form: 'newMessage',
  enableReinitialize: true,
})(NewMessageForm);

export default connect(mapStateToProps, { addMessage })(ReduxForm);
