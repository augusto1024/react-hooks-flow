import * as React from 'react';

export const useForceUpdate = () => {
  const [, setValue] = React.useState(0);
  return () => setValue((value) => value + 1);
};
