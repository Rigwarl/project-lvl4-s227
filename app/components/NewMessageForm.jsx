// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, type FormProps } from 'redux-form';
import { Form, FormGroup, Button, Input } from 'reactstrap';
import { addMessage } from '../actions';
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

const renderTextarea = ({ input }): React.Element<any> => (
  <Input
    {...input}
    type="textarea"
    rows="3"
    placeholder="Input message"
  />
);

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
        <FormGroup>
          <Field
            name="text"
            component={renderTextarea}
            disabled={this.props.submitting}
          />
        </FormGroup>
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
