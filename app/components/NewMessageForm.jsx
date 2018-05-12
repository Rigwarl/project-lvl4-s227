// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, type FormProps } from 'redux-form';
import { addMessage } from '../actions';
import type { State } from '../types';

export type Props = {|
  disabled: boolean,
|} & FormProps;

const mapStateToProps = (state: State): Props => ({
  disabled: state.messageAddingStatus === 'requested',
});
const dispatchProps = { onSubmit: addMessage };

const NewMessageForm = ({ handleSubmit, disabled }: Props) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <Field
        disabled={disabled}
        name="text"
        component="textarea"
        rows="3"
        placeholder="Input message"
        className="form-control"
      />
    </div>
    <button
      disabled={disabled}
      type="submit"
      className="btn btn-primary"
    >Send
    </button>
  </form>
);

const ReduxForm = reduxForm({ form: 'newMessage' })(NewMessageForm);
export default connect(mapStateToProps, dispatchProps)(ReduxForm);
