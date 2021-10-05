import React from 'react';
import { ComponentTreeAction, ComponentTreeContext } from '../Providers/ComponentTreeProvider';
import { ComponentTree } from '../Types/ComponentTree';

export const useComponentTree = (): [ComponentTree, React.Dispatch<ComponentTreeAction>] => {
  const context = React.useContext(ComponentTreeContext);
  if (!context) {
    throw new Error(
      'ERROR: "useComponentTree" must be used within a ComponentTreeProvider.',
    );
  }
  return context;
};
