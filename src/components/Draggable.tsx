import { type HTMLAttributes, type DragEventHandler } from "react";
import { useKanban } from "../hooks/useKanban";
import { ColumnsObject } from "../utils/ColumnsObject";

interface DraggableProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
}

export const Draggable = ({ id, children, ...rest }: DraggableProps) => {
  const { setColumns } = useKanban();

  const handleDragStart: DragEventHandler = (event) => {
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.setData("text/plain", id);

    setColumns((columns: ColumnsObject) => {
      const newColumns = columns.clone();

      const draggable = newColumns.findDraggableById(id);

      draggable.lift();

      return newColumns;
    });
  };

  return (
    <div draggable onDragStart={handleDragStart} {...rest}>
      {children}
    </div>
  );
};
