import clsx from "clsx";
import React from "react";
import { useDrop } from "react-dnd";
import { ComponentNode } from "../Types/ComponentTree";
import { DragTypes } from "../Types/DragTypes";
import Component from "./Component";

interface ComponentContainerProps extends React.HTMLProps<HTMLDivElement> {
  node: ComponentNode;
  onMove: (componentId: string, parentId: string) => void;
}

const ComponentContainer = (props: ComponentContainerProps): JSX.Element => {
  const { className, children, node, onMove, ...otherProps } = props;
  const [{ isOverCurrent }, drop] = useDrop({
    accept: DragTypes.COMPONENT,
    drop: (item: ComponentNode, monitor) => {
      const didDrop = monitor.didDrop();

      if (didDrop) {
        return;
      }

      onMove(item.id, node.id);
    },
    collect: (monitor) => ({
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  return (
    <div
      className={clsx(
        "row-span-1 p-4 rounded-md bg-gray-100 shadow-inner h-100 flex flex-wrap flex-grow justify-center content-center",
        isOverCurrent && "bg-gray-300",
        className
      )}
      ref={drop}
      {...otherProps}
    >
      {node.hasChildren() ? (
        node.children.map((child: ComponentNode) => (
          <Component
            level={0}
            key={child.model.id}
            id={child.model.id}
            node={child}
            onDropEvent={onMove}
          />
        ))
      ) : (
        <p className="text-gray-400">No components to render</p>
      )}
    </div>
  );
};

export default ComponentContainer;
