import { type DraggableObject } from "./DraggableObject";

interface ColumnObjectConstructor {
  draggables?: DraggableObject[];
  id: string;
}

export class ColumnObject {
  id: string;
  draggables: DraggableObject[];
  isHighlighted: boolean = false;

  constructor({ draggables, id }: ColumnObjectConstructor) {
    this.id = id;
    this.draggables = draggables || [];
  }

  addDraggable(draggable: DraggableObject) {
    this.draggables.push(draggable);
  }

  removeDraggable(id: string) {
    const deletedDraggable = this.draggables.find(
      (draggable) => draggable.id === id
    );

    if (!deletedDraggable) throw new Error("Draggable could not be deleted");

    this.draggables = this.draggables.filter(
      (draggable) => draggable.id !== id
    );

    return deletedDraggable.clone();
  }

  findDraggableById(id: string) {
    const draggable = this.draggables.find((draggable) => draggable.id === id);

    if (!draggable) throw new Error("Draggable not found");

    return draggable;
  }

  hasDraggable(id: string) {
    return this.draggables.some((draggable) => draggable.id === id);
  }

  clone() {
    let newDraggables: DraggableObject[] = [];

    for (const draggable of this.draggables) {
      newDraggables.push(draggable.clone());
    }

    return new ColumnObject({ draggables: newDraggables, id: this.id });
  }

  highlight() {
    this.isHighlighted = true;
  }

  getDraggableIndex(draggableId: string) {
    return this.draggables.findIndex(
      (draggable) => draggable.id === draggableId
    );
  }

  insertDraggableAtIndex(draggable: DraggableObject, index: number) {
    this.draggables.splice(index, 0, draggable);
  }
}
