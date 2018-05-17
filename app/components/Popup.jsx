// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import NewChannelPopup from './NewChannelPopup';
import type { State, PopupName } from '../types';

type Props = {|
  popupName: PopupName,
|};

const mapStateToProps = (state: State): Props => ({
  popupName: state.popup.name,
});

const Popup = ({ popupName }: Props) => {
  switch (popupName) {
    case 'newChannel':
      return <NewChannelPopup />;
    case 'none':
    default:
      return null;
  }
};

export default connect(mapStateToProps)(Popup);

