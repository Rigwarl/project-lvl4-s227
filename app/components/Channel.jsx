// @flow

import React from 'react';
import { connect } from 'react-redux';
import MessagesList from './MessagesList';
import NewMessageForm from './NewMessageForm';
import type { State } from '../types';

type Props = {|
  channelName: string,
|};

const mapStateToProps = (state: State): Props => ({
  channelName: state.channels.byId[state.channels.currentId].name,
});

const Channel = ({ channelName }) => (
  <div className="channel pt-3 pb-3">
    <h2 className="h3 mb-2">
      <span className="font-weight-normal text-muted">#</span>
      {channelName}
    </h2>
    <MessagesList />
    <NewMessageForm />
  </div>
);

export default connect(mapStateToProps)(Channel);
