import React from "react";
import clsx from "clsx";
import { useDrag, useDrop } from "react-dnd";
import { ComponentNode } from "../Types/ComponentTree";
import { DragTypes } from "../Types/DragTypes";
import {
  COMPONENT_MESSAGE,
  NEW_COMPONENT_MESSAGE,
} from "../Constants/Messages";
import MenuButton from "./MenuButton";

export interface ComponentProps extends React.HTMLProps<HTMLDivElement> {
  id: string;
  node: ComponentNode;
  level: number;
  canDrag: boolean;
  onDropEvent: (componentId: string, parentId: string) => void;
  onRemoveEvent: (componentId: string) => void;
}

const Component = (props: ComponentProps): JSX.Element => {
  const {
    className,
    id,
    level,
    node,
    onDropEvent,
    onRemoveEvent,
    children,
    canDrag,
    ...otherProps
  } = props;

  console.log(NEW_COMPONENT_MESSAGE(id, level, COMPONENT_MESSAGE.RENDER_START));

  const [{ isDragging }, drag] = useDrag({
    type: DragTypes.COMPONENT,
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag,
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

  React.useEffect(() => {
    console.log(
      NEW_COMPONENT_MESSAGE(
        id,
        level,
        COMPONENT_MESSAGE.USE_EFFECT_NO_DEPENDENCY
      )
    );

    return () => {
      console.log(
        NEW_COMPONENT_MESSAGE(id, level, COMPONENT_MESSAGE.CLEANUP_EFFECTS)
      );
    };
  }, [id, level]);

  const [useEffectDependency, setUseEffectDependency] = React.useState(() => {
    console.log(
      NEW_COMPONENT_MESSAGE(id, level, COMPONENT_MESSAGE.LAZY_USE_STATE)
    );
    return false;
  });
  React.useEffect(() => {
    console.log(
      NEW_COMPONENT_MESSAGE(id, level, COMPONENT_MESSAGE.USE_EFFECT_DEPENDENCY)
    );
  }, [useEffectDependency, id, level]);
  const triggerUseEffectDependency = (): void => {
    setUseEffectDependency(!useEffectDependency);
  };

  const [state, setState] = React.useState(false);
  const triggerState = (): void => {
    setState(!state);
    console.log(NEW_COMPONENT_MESSAGE(id, level, COMPONENT_MESSAGE.USE_STATE));
  };

  const triggerUnmount = (): void => {
    onRemoveEvent(id);
  };

  console.log(NEW_COMPONENT_MESSAGE(id, level, COMPONENT_MESSAGE.RENDER_END));

  const menuActions = [
    { name: "Trigger useState", action: triggerState },
    {
      name: "Trigger useEffect w/ dependency",
      action: triggerUseEffectDependency,
    },
    { name: "Unmount component", action: triggerUnmount },
  ];

  return (
    <div
      id={id}
      ref={drag}
      style={{ minWidth: "300px", margin: "10px" }}
      className={clsx(
        "bg-white shadow-sm rounded-md p-4 flex-auto flex flex-col",
        className,
        isDragging && "transform duration-100 scale-105"
      )}
      {...otherProps}
    >
      <div className="flex place-items-center justify-between mb-4">
        <p>Component {id}</p>
        <MenuButton
          disabled={canDrag}
          actions={menuActions}
          width="16px"
          height="16px"
        />
      </div>

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
              canDrag={canDrag}
              level={level + 1}
              key={child.model.id}
              id={child.model.id}
              node={child}
              onDropEvent={onDropEvent}
              onRemoveEvent={onRemoveEvent}
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
