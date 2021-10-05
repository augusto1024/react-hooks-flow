import React from "react";
import clsx from "clsx";
import { useDrag, useDrop } from "react-dnd";
import { ComponentNode } from "../Types/ComponentTree";
import { DragTypes } from "../Types/DragTypes";

export interface ComponentProps extends React.HTMLProps<HTMLDivElement> {
  id: string;
  node: ComponentNode;
  level: number;
  onDropEvent: (componentId: string, parentId: string) => void;
}

const Component = (props: ComponentProps): JSX.Element => {
  const { className, id, level, node, onDropEvent, children, ...otherProps } =
    props;
  const [{ isDragging }, drag] = useDrag({
    type: DragTypes.COMPONENT,
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOverCurrent }, drop] = useDrop({
    accept: DragTypes.COMPONENT,
    drop: (item: ComponentNode, monitor) => {
      const didDrop = monitor.didDrop();

      if (didDrop) {
        return;
      }

      onDropEvent(item.id, id);
    },
    collect: (monitor) => ({
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  return (
    <div
      id={id}
      ref={drag}
      style={{ minWidth: "400px", margin: "10px" }}
      className={clsx(
        "bg-white shadow-sm rounded-md p-4 flex-auto flex flex-col",
        className,
        isDragging && "transform duration-100 scale-105"
      )}
      {...otherProps}
    >
      <p className="mb-4">Component {id}</p>
      <div
        className={clsx(
          "row-span-1 p-4 rounded-md bg-gray-100 shadow-inner h-100 flex flex-wrap flex-grow justify-center content-center",
          isOverCurrent && "bg-gray-300"
        )}
        ref={drop}
      >
        {node.hasChildren() ? (
          node.children.map((child: ComponentNode) => (
            <Component
              level={level + 1}
              key={child.model.id}
              id={child.model.id}
              node={child}
              onDropEvent={onDropEvent}
            />
          ))
        ) : (
          <p className="text-gray-400">Drop your component here</p>
        )}
      </div>
    </div>
  );
};

export default Component;
