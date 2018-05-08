// @flow

export type Channel = {
  +id: number,
  +name: string,
  +removable: boolean,
};

export type State = {
  +channels: Channel[],
  +userName: string,
};
