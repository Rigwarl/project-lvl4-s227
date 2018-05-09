// @flow

import { connect } from 'react-redux';
import Component from '../components/ChannelsList';
import { channelsSelector } from '../selectors';
import type { Props } from '../components/ChannelsList';
import type { State } from '../types';

const mapStateToProps = (state: State): Props => ({
  channels: channelsSelector(state),
  userName: state.user.name,
});
const Container = connect(mapStateToProps)(Component);

export default Container;
