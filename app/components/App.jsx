// @flow

import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import ChannelsList from './ChannelsList';
import MessagesList from './MessagesList';
import NewMessageForm from './NewMessageForm';
import Popup from './Popup';

const App = () => (
  <div>
    <Container className="pt-3">
      <Row>
        <Col sm="3" className="mb-4">
          <h1 className="h3 mb-2">Slack Killer</h1>
          <ChannelsList />
        </Col>
        <Col sm="9" className="mb-4">
          <MessagesList />
          <NewMessageForm />
        </Col>
      </Row>
    </Container>
    <Popup />
  </div>
);

export default App;
