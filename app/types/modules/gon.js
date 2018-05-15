// @flow

// eslint-disable-next-line
import type { Channel, Message } from '.';

declare module 'gon' {
  declare export default {
    +channels: {|
      +[string]: Channel,
    |},
    +messages: {|
      +[string]: Message,
    |},
    +currentChannelId: number,
  }
}
