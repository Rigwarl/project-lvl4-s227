// @flow

import axios from 'axios';
import io from 'socket.io-client';
import type { Message, NewMessage } from './types';

const prefix = 'api/v1';

const addMessage = async (message: NewMessage): Promise<Message> => {
  const data = {
    type: 'messages',
    attributes: message,
  };
  const { data: { attributes } } = await axios.post(`/${prefix}/channels/${message.channelId}/messages`, { data });

  return attributes;
};

export const request = {
  addMessage,
};

export const connect = (dispatch, actions) => {
  const socketActions = {
    newMessage: ({ attributes }) => actions.addMessageEvent(attributes),
  };
  const socket = io();

  Object.entries(socketActions).forEach(([type, action]) =>
    socket.on(type, ({ data }) => dispatch(action(data))));
};
