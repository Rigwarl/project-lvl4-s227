// @flow

import React from 'react';
import type { Channel } from './types';

type Props = {
  channels: Channel[],
  userName: string,
};

const App = ({ channels, userName }: Props) => (
  <div className="container pt-3">
    <h1 className="h2">Hello, {userName}!</h1>
    <ul className="list-group">
      {channels.map(({ id, name }) =>
        <li key={id} className="list-group-item">{name}</li>)}
    </ul>
  </div>
);

export default App;
