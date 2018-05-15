// @flow

import axios from 'axios';
import io from 'socket.io-client';
import routes from './routes';
import type { Message, NewMessage } from './types';

const addMessage = async (message: NewMessage): Promise<Message> => {
  const data = {
    type: 'messages',
    attributes: message,
  };
  const route = routes.messages(message.channelId);
  const { data: { attributes } } = await axios.post(route, { data });

  return attributes;
};

export const request = {
  addMessage,
};

export const connect = (dispatch: Function, actions: any) => {
  const socketActions = {
    newMessage: ({ attributes }) => actions.addMessageEvent(attributes),
  };
  const socket = io();

  Object.keys(socketActions).forEach(type =>
    socket.on(type, ({ data }) => dispatch(socketActions[type](data))));
};
