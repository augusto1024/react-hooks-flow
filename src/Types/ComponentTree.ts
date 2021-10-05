import TreeModel from 'tree-model';
import { v4 as uuidv4 } from 'uuid';

export type ComponentNode = TreeModel.Node<{id: string}>;

export const ROOT_INDEX = 'root';

export class ComponentTree {
  private tree: TreeModel;
  public root: ComponentNode;

  constructor() {
    this.tree = new TreeModel();
    this.root = this.tree.parse({ id: ROOT_INDEX });
  }

  public addComponent(): ComponentNode {
    const id = uuidv4();

    const component = this.tree.parse({ id });
    this.root.addChild(component);
    return component;
  }

  public moveComponent(componentId: string, parentId: string): ComponentNode {
    const component = this.getComponentAtIndex(componentId);
    if (component.isRoot()) {
      throw new Error('Root component cannot be moved');
    }

    const parentComponent = !parentId ? this.root : this.getComponentAtIndex(parentId);

    component.drop();
    parentComponent.addChild(component);

    return component;
  }

  public removeComponent(componentId: string) {
    const component = this.getComponentAtIndex(componentId);
    if (component.isRoot()) {
      throw new Error('Root component cannot be removed');
    }

    component.drop();
  }

  get length(): number {
    return this.root.all({ strategy: 'pre' }, () => true).length;
  }

  public getComponentAtIndex(index: string): ComponentNode {
    const component = this.root.first((node: ComponentNode) => (node.model.id === index));

    if (!component) {
      throw new Error(`Component with index ${index} doesn't exist`);
    }

    return component;
  }
}
