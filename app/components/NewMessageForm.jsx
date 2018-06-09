// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, type FormProps } from 'redux-form';
import { Form, FormGroup, Button, Input, FormFeedback } from 'reactstrap';
import { HotKeys } from 'react-hotkeys';
import { addMessage } from '../actions';
import { required } from '../validation';
import type { State } from '../types';

export type Props = {|
  userName: string,
  channelId: number,
|} & FormProps;

const mapStateToProps = (state: State): Props => ({
  userName: state.user.name,
  channelId: state.channels.currentId,
});

const renderMessageField = ({ input, inputRef, meta: { touched, error } }): React.Element<any> => (
  <FormGroup className="position-relative">
    <Input
      {...input}
      innerRef={inputRef}
      invalid={touched && !!error}
      type="textarea"
      placeholder="Input message"
      rows="3"
    />
    <FormFeedback className="position-absolute text-right">{error}</FormFeedback>
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
      this.messageInputRef.focus();
      throw new SubmissionError({ text: textError });
    }

    const { userName, channelId } = this.props;
    const message = { text, userName, channelId };

    await this.props.addMessage(message);
    this.props.initialize();
    this.messageInputRef.focus();
  }

  messageInputRef: HTMLTextAreaElement

  render() {
    const submit = this.props.handleSubmit(this.onSubmit);

    return (
      <HotKeys
        keyMap={{ submit: ['ctrl+enter', 'command+enter'] }}
        handlers={{ submit }}
      >
        <Form onSubmit={submit}>
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
      </HotKeys>
    );
  }
}

const ReduxForm = reduxForm({
  form: 'newMessage',
})(NewMessageForm);

export default connect(mapStateToProps, { addMessage })(ReduxForm);
