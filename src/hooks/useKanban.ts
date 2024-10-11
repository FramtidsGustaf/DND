import { type DragEventHandler, useContext } from "react";
import { dndContext } from "../components/DNDProvider";
import { type ColumnsObject } from "../utils/ColumnsObject";

export const useKanban = () => {
  const { columns, setColumns } = useContext(dndContext);

  const findColumnById = (id: string) => columns.findColumnById(id);
  const findColumnByDraggableId = (draggableId: string) =>
    columns.findColumnByDraggableId(draggableId);

  const findDraggableById = (id: string) => columns.findDraggableById(id);

  // Highlight the column when dragging a draggable over it
  const highlightColumn = (id: string) => {
    setColumns((columns: ColumnsObject) => {
      const newColumns = columns.clone();

      const column = newColumns.findColumnById(id);

      column.highlight();

      return newColumns;
    });
  };

  // Move the dragged element to the target column
  const moveDraggable = (draggableId: string, targetId: string) => {
    setColumns((columns: ColumnsObject) => {
      const newColumns = columns.clone();

      const from = newColumns.findColumnByDraggableId(draggableId);
      const to = newColumns.findColumnById(targetId);

      const draggable = from.removeDraggable(draggableId);

      to.addDraggable(draggable);

      return newColumns;
    });
  };

  // Lift the draggable element when dragging starts
  const liftDraggable = (draggableId: string) => {
    setColumns((columns: ColumnsObject) => {
      const newColumns = columns.clone();

      const draggable = newColumns.findDraggableById(draggableId);

      draggable.lift();

      return newColumns;
    });
  };

  const handleDragOverColumn: DragEventHandler = (event) => {
    event.preventDefault();
    const targetId = event.currentTarget.id;

    highlightColumn(targetId);
  };

  const handleDropInColumn: DragEventHandler = (event) => {
    event.preventDefault();
    const draggableId = event.dataTransfer.getData("text/plain");
    const targetId = event.currentTarget.id;

    moveDraggable(draggableId, targetId);
  };

  const dropInVoid = (draggedId: string, voidId: string) => {
    setColumns((columns: ColumnsObject) => {
      const newColumns = columns.clone();
      const from = newColumns.findColumnByDraggableId(draggedId);
      const to = newColumns.findColumnByDraggableId(voidId);
      const draggable = from.removeDraggable(draggedId);
      const thisIndex = to.getDraggableIndex(voidId);

      to.insertDraggableAtIndex(draggable, thisIndex);

      return newColumns;
    });
  };

  const highlightColumnInVoid = (voidId: string) => {
    setColumns((columns: ColumnsObject) => {
      const newColumns = columns.clone();
      const column = newColumns.findColumnByDraggableId(voidId);

      column.highlight();

      return newColumns;
    });
  };

  return {
    columns: columns.columns,
    setColumns,
    findColumnByDraggableId,
    findColumnById,
    findDraggableById,
    highlightColumn,
    moveDraggable,
    handleDragOverColumn,
    handleDropInColumn,
    liftDraggable,
    dropInVoid,
    highlightColumnInVoid,
  };
};
