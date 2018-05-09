// @flow

import { createSelector } from 'reselect';

// flow cannot handle Object.values =(
const getValues = obj => Object.keys(obj).map(key => obj[key]);

export const channelsSelector = createSelector(
  ({ channels }) => channels,
  getValues,
);
