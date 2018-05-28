// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import NewChannelPopup from './NewChannelPopup';
import RemoveChannelPopup from './RemoveChannelPopup';
import EditChannelPopup from './EditChannelPopup';
import BlockedChannelPopup from './BlockedChannelPopup';
import type { State, PopupName } from '../../types';

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
    case 'removeChannel':
      return <RemoveChannelPopup />;
    case 'editChannel':
      return <EditChannelPopup />;
    case 'blockedChannel':
      return <BlockedChannelPopup />;
    case 'none':
    default:
      return null;
  }
};

export default connect(mapStateToProps)(Popup);

