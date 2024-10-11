import { type HTMLAttributes, type DragEventHandler } from "react";
import { useKanban } from "../hooks/useKanban";
import { Void } from "./Void";

interface DraggableProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
}

export const Draggable = ({ id, children, ...rest }: DraggableProps) => {
  const { liftDraggable } = useKanban();

  const handleDragStart: DragEventHandler = (event) => {
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.setData("text/plain", id);

    liftDraggable(id);
  };

  return (
    <>
      <Void id={id} />
      <div draggable onDragStart={handleDragStart} id={id} {...rest}>
        {children}
      </div>
    </>
  );
};
