// @flow

declare module 'gon' {
  declare type Channel = {|
    +id: number,
    +name: string,
    +removable: boolean,
  |};

  declare type Message = {|
    +id: number,
    +text: string,
    +channelId: number,
    +userName: string,
  |};

  declare export default {|
    +channels: Channel[],
    +messages: Message[],
    +currentChannelId: number,
  |}
}
