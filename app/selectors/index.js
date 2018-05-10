// @flow

import { createSelector } from 'reselect';

// flow cannot handle Object.values =(
const getValues = obj => Object.keys(obj).map(key => obj[key]);
const createKeySelector = key => obj => obj[key];

export const channelsSelector = createSelector(
  createKeySelector('channels'),
  getValues,
);

export const messagesSelector = createSelector(
  createKeySelector('messages'),
  getValues,
);
