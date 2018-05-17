// @flow

import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import ChannelsList from './ChannelsList';
import MessagesList from './MessagesList';
import NewMessageForm from './NewMessageForm';
import Popup from './Popup.jsx';

const App = () => (
  <div>
    <Container className="pt-3">
      <Row>
        <Col sm="3" className="mb-4">
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
