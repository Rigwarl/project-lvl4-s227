// @flow

export type User = {|
  +name: string,
|};

export type Channel = {|
  +id: number,
  +name: string,
  +removable: boolean,
|};

export type Message = {|
  +text: string,
  +id: number,
  +channelId: number,
  +userName: string,
|};

export type State = {|
  +user: User,
  +channels: {|
    +[string]: Channel,
  |},
  +messages: {|
    +[string]: Message,
  |},
  +messageAddingStatus: 'none' | 'requested' | 'failed' | 'successed',
  +currentChannelId: number,
|};
