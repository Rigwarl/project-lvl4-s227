// @flow

export type User = {|
  +name: string,
|};

export type Channel = {|
  +id: number,
  +name: string,
  +removable: boolean,
|};

export type ChannelsMap = {
  +[string]: Channel,
};

export type NewMessage = {|
  +text: string,
  +channelId: number,
  +userName: string,
|};

export type Message = {|
  +id: number,
  +text: string,
  +channelId: number,
  +userName: string,
|};

export type MessagesMap = {
  +[string]: Message,
};

export type InitData = {|
  +user: User,
  +channels: Channel[],
  +messages: Message[],
  +currentChannelId: number,
|};

export type PopupName = 'none' | 'newChannel';

export type Popup = {|
  name: PopupName,
  open: boolean,
|};

export type State = {|
  +user: User,
  +messages: MessagesMap,
  +channels: ChannelsMap,
  +channelsEditing: boolean,
  +currentChannelId: number,
  +popup: Popup,
|};
