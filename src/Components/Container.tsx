import AddComponent from "./AddComponent";
import ComponentContainer from "./ComponentContainer";
import RemoveComponent from "./RemoveComponent";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useComponentTree } from "../Hooks/use-component-tree";
import { useForceUpdate } from "../Hooks/use-force-update";
import { ComponentNode } from "../Types/ComponentTree";
import React from "react";
import clsx from "clsx";
import StartStop from "./StartStop";

const Container = (props: React.HTMLProps<HTMLDivElement>): JSX.Element => {
  const { className, ...otherProps } = props;
  const [tree, dispatch] = useComponentTree();
  const [running, setRunning] = React.useState(false);
  const forceUpdate = useForceUpdate();

  const addComponent = (): void => {
    dispatch({ type: "ADD" });
    forceUpdate();
  };

  const dragComponent = (componentId: string, parentId: string): void => {
    // This is to avoid rerenders for false drops
    if (!componentId || !parentId) {
      return;
    } else if (
      tree
        .getComponentAtIndex(parentId)
        .children.find((item: ComponentNode) => item.model.id === componentId)
    ) {
      return;
    }

    dispatch({ type: "MOVE", componentId, parentId });
    forceUpdate();
  };

  const removeComponent = (componentId: string): void => {
    dispatch({ type: "REMOVE", componentId });
    forceUpdate();
  };

  const toggleApp = (): void => {
    setRunning(!running);
  };

  return (
    <div className={clsx("bg-white shadow-md rounded-md p-5", className)}>
      <div className="grid">
        <DndProvider backend={HTML5Backend}>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex">
              <AddComponent
                canAdd={!running}
                onAdd={addComponent}
                className="mr-5"
              />
              <StartStop onClick={toggleApp} running={running} />
            </div>
            <ComponentContainer
              canDrag={!running}
              onMove={dragComponent}
              onRemove={removeComponent}
              node={tree.root}
              className="col-span-1"
            />
            <RemoveComponent
              onRemove={removeComponent}
              className="col-span-1"
            />
          </div>
        </DndProvider>
      </div>
    </div>
  );
};

export default Container;
