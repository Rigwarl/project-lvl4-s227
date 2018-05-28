// @flow

const prefix = 'api/v1';

export default {
  messages: (channelId: number) => `/${prefix}/channels/${channelId}/messages`,
  channels: () => `/${prefix}/channels`,
  channel: (id: number) => `/${prefix}/channels/${id}`,
  holdChannel: (id: number) => `/${prefix}/channels/${id}/hold`,
};
