// @flow

import axios from 'axios';
import io from 'socket.io-client';

type Method = 'get' | 'post' |'update' | 'delete';
type Action = 'addMessage';
type DataTypes = 'messages';
type ActionData = [Method, DataTypes, string];

const getActionData = (action: Action, params: Object): ActionData => ({
  addMessage: ({ channelId }) => ['post', 'messages', `channels/${channelId}/messages`],
})[action](params);

const getReguestData = (method, type, attributes) => {
  switch (method) {
    case 'delete':
      return null;
    case 'post':
      return { type, attributes };
    default:
      return { id: attributes.id, type, attributes };
  }
};

export const request = async (action: Action, attributes: any) => {
  const [method, type, url] = getActionData(action, attributes);
  const data = getReguestData(method, type, attributes);
  const { data: { attributes: result } } = await axios[method](`/api/v1/${url}`, { data });

  return result;
};

export const connect = (dispatch, actions) => {
  const socketActions = {
    newMessage: actions.addMessage,
  };
  const socket = io();

  socketActions.entries(([type, action]) =>
    socket.on(type, data => dispatch(action(data))));
};
