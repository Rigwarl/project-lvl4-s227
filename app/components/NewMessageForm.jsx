// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, type FormProps } from 'redux-form';
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

const renderMessageField = ({ input, inputRef, meta: { touched, error } }): React.Element<any> => (
  <FormGroup>
    <Input
      {...input}
      innerRef={inputRef}
      invalid={touched && !!error}
      type="textarea"
      placeholder="Input message"
      rows="3"
    />
    <FormFeedback>{error}</FormFeedback>
  </FormGroup>
);

class NewMessageForm extends React.Component<Props> {
  componentDidMount() {
    this.messageInputRef.focus();
  }

  componentDidUpdate(prevProps) {
    if (this.props.channelId !== prevProps.channelId) {
      this.messageInputRef.focus();
    }
  }

  onSubmit = async ({ text }) => {
    const textError = required('Message')(text);

    if (textError) {
      throw new SubmissionError({ text: textError });
    }

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
          inputRef={(input) => { this.messageInputRef = input; }}
          disabled={this.props.submitting}
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
