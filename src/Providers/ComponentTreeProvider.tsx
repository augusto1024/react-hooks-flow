import React from "react";
import { ComponentTree } from "../Types/ComponentTree";

export interface ComponentTreeAction {
  type: "ADD" | "MOVE" | "REMOVE";
  componentId?: string;
  parentId?: string;
}

export const ComponentTreeContext: React.Context<any> =
  React.createContext(undefined);

const componentTreeReducer = (
  componentTree: ComponentTree,
  action: ComponentTreeAction
) => {
  switch (action.type) {
    case "ADD": {
      componentTree.addComponent();
      return componentTree;
    }
    case "MOVE": {
      if (!action.componentId) {
        throw new Error('ERROR: "componentId" is required.');
      } else if (!action.parentId) {
        throw new Error('ERROR: "parentId" is required.');
      }

      if (action.componentId !== action.parentId) {
        componentTree.moveComponent(action.componentId, action.parentId);
      }

      return componentTree;
    }
    case "REMOVE": {
      if (!action.componentId) {
        throw new Error('ERROR: "componentId" is required.');
      }

      componentTree.removeComponent(action.componentId);
      return componentTree;
    }
    default: {
      throw new Error(
        `ERROR: "${action.type}" is not a valid type. Please use "ADD", "MOVE" or "REMOVE"`
      );
    }
  }
};

export const ComponentTreeProvider = (props: {
  children: any;
}): JSX.Element => {
  const { children } = props;
  const componentTree = new ComponentTree();
  const [tree, dispatch] = React.useReducer(
    componentTreeReducer,
    componentTree
  );

  return (
    <ComponentTreeContext.Provider value={[tree, dispatch]}>
      {children}
    </ComponentTreeContext.Provider>
  );
};
