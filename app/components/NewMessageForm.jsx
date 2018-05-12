// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, type FormProps } from 'redux-form';
import { addMessage } from '../actions';
import type { State } from '../types';

export type Props = {|
  userName: string,
  channelId: number,
|} & FormProps;

const mapStateToProps = (state: State): Props => ({
  userName: state.user.name,
  channelId: state.currentChannelId,
});

class NewMessageForm extends React.Component<Props> {
  onSubmit = async ({ text }) => {
    const { userName, channelId } = this.props;
    const message = { text, userName, channelId };

    await this.props.addMessage(message);
    this.props.reset();
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <div className="form-group">
          <Field
            disabled={this.props.submitting}
            name="text"
            component="textarea"
            rows="3"
            placeholder="Input message"
            className="form-control"
          />
        </div>
        <button
          disabled={this.props.submitting}
          type="submit"
          className="btn btn-primary"
        >Send
        </button>
      </form>
    );
  }
}

const ReduxForm = reduxForm({ form: 'newMessage' })(NewMessageForm);
export default connect(mapStateToProps, { addMessage })(ReduxForm);
