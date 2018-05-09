// @flow

import React from 'react';
import { Field, reduxForm, type FormProps } from 'redux-form';

const NewMessageForm = ({ handleSubmit }: FormProps) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <Field
        name="text"
        component="textarea"
        rows="3"
        placeholder="Input message"
        className="form-control"
      />
    </div>
    <button type="submit" className="btn btn-primary">Send</button>
  </form>
);

export default reduxForm({
  form: 'newMessage',
})(NewMessageForm);
