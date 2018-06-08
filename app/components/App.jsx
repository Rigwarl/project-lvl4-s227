// @flow

import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import ChannelsList from './ChannelsList';
import Channel from './Channel';
import Popup from './Popup';

const App = () => (
  <div>
    <Container>
      <Row>
        <Col sm="3">
          <ChannelsList />
        </Col>
        <Col sm="9">
          <Channel />
        </Col>
      </Row>
    </Container>
    <Popup />
  </div>
);

export default App;
