// @flow

import axios from 'axios';
import io from 'socket.io-client';
import routes from './routes';
import type { Channel, Message, NewMessage } from './types';

const addMessage = async (message: NewMessage): Promise<Message> => {
  const data = {
    type: 'messages',
    attributes: message,
  };
  const route = routes.messages(message.channelId);
  const { data: { attributes } } = await axios.post(route, { data });

  return attributes;
};

const addChannel = async (name: string): Promise<Channel> => {
  const data = {
    type: 'channels',
    attributes: { name },
  };
  const route = routes.channels();
  const { data: { attributes } } = await axios.post(route, { data });

  return attributes;
};

const holdChannel = async (id: number): Promise<void> => {
  const route = routes.holdChannel(id);

  try {
    await axios.post(route);
  } catch (e) {
    throw e.response.data.error[0];
  }
};

const freeChannel = async (id: number): Promise<void> => {
  const route = routes.holdChannel(id);
  await axios.delete(route);
};

const editChannel = async (channel: Channel): Promise<void> => {
  const data = {
    type: 'channels',
    id: channel.id,
    attributes: channel,
  };
  const route = routes.channel(channel.id);
  await axios.patch(route, { data });
};

const removeChannel = async (id: number): Promise<void> => {
  const route = routes.channel(id);
  await axios.delete(route);
};

export const request = {
  addMessage,
  addChannel,
  holdChannel,
  freeChannel,
  editChannel,
  removeChannel,
};

export const connect = (dispatch: Function, actions: any) => {
  const socketActions = {
    newMessage: ({ attributes }) => actions.addMessageEvent(attributes),
    newChannel: ({ attributes }) => actions.addChannelEvent(attributes),
    renameChannel: ({ attributes }) => actions.editChannelEvent(attributes),
    removeChannel: ({ id }) => actions.removeChannelEvent(id),
  };
  const socket = io();

  Object.keys(socketActions).forEach(type =>
    socket.on(type, ({ data }) => dispatch(socketActions[type](data))));
};
