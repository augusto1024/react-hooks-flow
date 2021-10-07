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
  logger: (message: string) => void;
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
    logger,
    ...otherProps
  } = props;

  const name = node.model.name;

  logger(NEW_COMPONENT_MESSAGE(name, level, COMPONENT_MESSAGE.RENDER_START));

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
    logger(
      NEW_COMPONENT_MESSAGE(
        name,
        level,
        COMPONENT_MESSAGE.USE_EFFECT_NO_DEPENDENCY
      )
    );

    return () => {
      logger(
        NEW_COMPONENT_MESSAGE(name, level, COMPONENT_MESSAGE.CLEANUP_EFFECTS)
      );
    };
  }, [name, level, logger]);

  const [useEffectDependency, setUseEffectDependency] = React.useState(() => {
    logger(
      NEW_COMPONENT_MESSAGE(name, level, COMPONENT_MESSAGE.LAZY_USE_STATE)
    );
    return false;
  });
  React.useEffect(() => {
    logger(
      NEW_COMPONENT_MESSAGE(
        name,
        level,
        COMPONENT_MESSAGE.USE_EFFECT_DEPENDENCY
      )
    );
  }, [useEffectDependency, name, level, logger]);
  const triggerUseEffectDependency = (): void => {
    setUseEffectDependency(!useEffectDependency);
  };

  const [state, setState] = React.useState(false);
  const triggerState = (): void => {
    setState(!state);
    logger(NEW_COMPONENT_MESSAGE(name, level, COMPONENT_MESSAGE.USE_STATE));
  };

  const triggerUnmount = (): void => {
    onRemoveEvent(id);
  };

  logger(NEW_COMPONENT_MESSAGE(name, level, COMPONENT_MESSAGE.RENDER_END));

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
      <div className="inline-flex mb-4">
        <div className="w-full text-center" style={{ marginLeft: "40px" }}>
          <p className="text-lg">{node.model.name}</p>
          <p className="text-xs">{id}</p>
        </div>
        <MenuButton
          className="self-center"
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
              logger={logger}
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
