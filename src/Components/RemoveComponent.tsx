import clsx from "clsx";
import React from "react";
import { useDrop } from "react-dnd";
import TrashIcon from "../Icon/Trash";
import { ComponentNode } from "../Types/ComponentTree";
import { DragTypes } from "../Types/DragTypes";

interface RemoveComponentProps extends React.HTMLProps<HTMLDivElement> {
  onRemove: (id: string) => void;
}

const RemoveComponent = (props: RemoveComponentProps): JSX.Element => {
  const { className, onRemove, ...otherProps } = props;
  const [{ isOverCurrent }, drop] = useDrop({
    accept: DragTypes.COMPONENT,
    drop: (item: ComponentNode, monitor) => {
      onRemove(item.id);
    },
    collect: (monitor) => ({
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  return (
    <div
      ref={drop}
      className={clsx(
        "center rounded-md w-full p-5 flex justify-center",
        isOverCurrent && "transition duration-100 bg-red-300 shadow-inner",
        className
      )}
      {...otherProps}
    >
      <TrashIcon
        className={clsx(
          "fill-current",
          !isOverCurrent && "text-gray-400",
          isOverCurrent &&
            "text-white transition duration-100 transform scale-200"
        )}
      />
    </div>
  );
};

export default RemoveComponent;
