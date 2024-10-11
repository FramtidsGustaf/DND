import { DragEventHandler, useState } from "react";

import classes from "./Void.module.css";
import { useKanban } from "../hooks/useKanban";

interface VoidProps {
  id: string;
}

export const Void = ({ id }: VoidProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { dropInVoid, highlightColumnInVoid } = useKanban();

  const handleDragOver: DragEventHandler = (event) => {
    event.preventDefault();

    highlightColumnInVoid(id);
    setIsExpanded(true);
  };

  const handleDrop: DragEventHandler = (event) => {
    event.preventDefault();
    const draggedId = event.dataTransfer.getData("text/plain");

    dropInVoid(draggedId, id);
    setIsExpanded(false);
  };

  const handleDragLeave: DragEventHandler = (event) => {
    event.preventDefault();
    setIsExpanded(false);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      id={id}
      className={isExpanded ? classes.expanded : classes.void}
    />
  );
};
