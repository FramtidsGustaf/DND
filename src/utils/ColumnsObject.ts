import { ColumnObject } from "./ColumnObject";
import { DraggableObject } from "./DraggableObject";

export class ColumnsObject {
  columns: ColumnObject[];

  constructor({ columns, data }: { columns?: ColumnObject[]; data?: string }) {
    if (data) {
      this.columns = this.transformFromJSON(data);
    } else if (columns) {
      this.columns = columns;
    } else {
      this.columns = [];
    }
  }

  transformFromJSON(json: string) {
    const parsed = JSON.parse(json);

    let columns = [];

    for (const column of parsed.columns) {
      let draggables = [];
      if (!column.draggables) {
        columns.push(new ColumnObject({ id: column.id }));
        continue;
      }

      for (const draggable of column.draggables) {
        draggables.push(new DraggableObject(draggable));
      }

      columns.push(new ColumnObject({ id: column.id, draggables }));
    }

    return columns;
  }

  findDraggableById(id: string) {
    let draggable: DraggableObject | undefined;
    for (const column of this.columns) {
      draggable = column.findDraggableById(id);
      if (draggable) break;
    }

    if (!draggable) throw new Error("Draggable not found");

    return draggable;
  }

  findColumnById(id: string) {
    const column = this.columns.find((column) => column.id === id);

    if (!column) throw new Error("Column not found");

    return column;
  }

  findColumnByDraggableId(draggableId: string) {
    const column = this.columns.find((column) =>
      column.hasDraggable(draggableId)
    );

    if (!column) throw new Error("Column not found");

    return column;
  }

  clone() {
    const newColumns = this.columns.map((column) => column.clone());
    return new ColumnsObject({ columns: newColumns });
  }
}
