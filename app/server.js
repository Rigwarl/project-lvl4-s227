// @flow

import axios from 'axios';
import io from 'socket.io-client';
import type { Message, NewMessage } from './types';

const prefix = 'api/v1';

const addMessage = async (message: NewMessage): Promise<{ id: number, message: Message }> => {
  const data = {
    type: 'messages',
    attributes: message,
  };
  const { data: { id, attributes } } = await axios.post(`/${prefix}/channels/${message.channelId}/messages`, data);

  return { id, message: attributes };
};

export const request = {
  addMessage,
};

export const connect = (dispatch, actions) => {
  const socketActions = {
    newMessage: ({ id, attributes }) => actions.addMessageEvent({ id, message: attributes }),
  };
  const socket = io();

  Object.entries(socketActions).forEach(([type, action]) =>
    socket.on(type, ({ data }) => dispatch(action(data))));
};
