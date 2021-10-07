import AddComponent from "./AddComponent";
import ComponentContainer from "./ComponentContainer";
import RemoveComponent from "./RemoveComponent";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useComponentTree } from "../Hooks/use-component-tree";
import { useForceUpdate } from "../Hooks/use-force-update";
import { ComponentNode } from "../Types/ComponentTree";

const Container = (): JSX.Element => {
  const [tree, dispatch] = useComponentTree();
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

  return (
    <div className="bg-white shadow-md m-2 rounded-md w-full p-5">
      <div className="grid">
        <DndProvider backend={HTML5Backend}>
          <div className="grid grid-cols-1 gap-3">
            <AddComponent onAdd={addComponent} className="col-span-1" />
            <ComponentContainer
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
