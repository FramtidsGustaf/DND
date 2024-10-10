import { type HTMLAttributes, type DragEventHandler } from "react";
import { useKanban } from "../hooks/useKanban";
import { ColumnsObject } from "../utils/ColumnsObject";

interface DropZoneProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
}

export const DropZone = ({ id, ...rest }: DropZoneProps) => {
  const { setColumns } = useKanban();

  const handleDragOver: DragEventHandler = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";

    const targetId = event.currentTarget.id;
    setColumns((columns: ColumnsObject) => {
      const newColumns = columns.clone();

      const column = newColumns.findColumnById(targetId);

      column.highlight();

      return newColumns;
    });
  };

  const handleDrop: DragEventHandler = (event) => {
    event.preventDefault();

    const draggableId = event.dataTransfer.getData("text/plain");
    const targetId = event.currentTarget.id;

    setColumns((columns) => {
      const newColumns = columns.clone();

      const from = newColumns.findColumnByDraggableId(draggableId);

      const to = newColumns.findColumnById(targetId);

      const draggable = from.removeDraggable(draggableId);

      to.addDraggable(draggable);

      return newColumns;
    });
  };

  return (
    <div id={id} onDrop={handleDrop} onDragOver={handleDragOver} {...rest} />
  );
};
