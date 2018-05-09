// @flow

import { connect } from 'react-redux';
import Component from '../components/ChannelsList';
import type { Props } from '../components/ChannelsList';
import type { State } from '../types';

const mapStateToProps = ({ channels, user }: State): Props => ({
  channels: Object.keys(channels).map(key => channels[key]),
  userName: user.name,
});
const Container = connect(mapStateToProps)(Component);

export default Container;
