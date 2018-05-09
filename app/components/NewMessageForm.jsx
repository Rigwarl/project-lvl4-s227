// @flow

import React from 'react';
import { Field, reduxForm, type FormProps } from 'redux-form';

export type Props = {|
  disabled: boolean,
|} & FormProps;

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

export default reduxForm({
  form: 'newMessage',
})(NewMessageForm);
