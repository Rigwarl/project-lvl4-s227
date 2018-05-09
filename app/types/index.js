// @flow

export type User = {|
  +name: string,
|};

export type Channel = {|
  +id: number,
  +name: string,
  +removable: boolean,
|};

export type State = {|
  +user: User,
  +channels: {|
    +[string]: Channel
  |},
  +currentChannelId: number,
|};
