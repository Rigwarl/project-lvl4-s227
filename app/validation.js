// @flow

// eslint-disable-next-line import/prefer-default-export
export const required = (name = 'Field') =>
  value => (value ? undefined : `${name} must not be empty`);
