// @flow

// eslint-disable-next-line import/prefer-default-export
export const required = (name: string = 'Field') =>
  (value: string) => (value ? undefined : `${name} must not be empty`);
