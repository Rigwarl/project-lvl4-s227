// @flow

import React from 'react';
import ChannelsList from './ChannelsList';
import MessagesList from './MessagesList';
import NewMessageForm from './NewMessageForm';

const App = () => (
  <div className="container pt-3">
    <div className="row">
      <div className="col-3">
        <ChannelsList />
      </div>
      <div className="col-9">
        <MessagesList />
        <NewMessageForm />
      </div>
    </div>
  </div>
);

export default App;
