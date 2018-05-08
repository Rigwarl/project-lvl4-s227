// @flow

import { connect } from 'react-redux';
import Component from '../components/ChannelsList';
import type { Props } from '../components/ChannelsList';
import type { State } from '../types';

const mapStateToProps = ({ channels, userName }: State): Props => ({ channels, userName });
const Container = connect(mapStateToProps)(Component);

export default Container;
