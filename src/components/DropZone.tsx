import { type HTMLAttributes } from "react";
import { useKanban } from "../hooks/useKanban";

import classes from "./DropZone.module.css";

interface DropZoneProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
}

export const DropZone = ({ id, ...rest }: DropZoneProps) => {
  const { handleDragOverColumn, handleDropInColumn } = useKanban();

  return (
    <div
      id={id}
      onDrop={handleDropInColumn}
      onDragOver={handleDragOverColumn}
      className={classes.dropZone}
      {...rest}
    />
  );
};
