import { useKanban } from "../hooks/useKanban";
import { Card } from "./Card";
import { DropZone } from "./DropZone";

import classes from "./Column.module.css";

export const Column = ({ id }: { id: string }) => {
  const { findColumnById } = useKanban();

  const column = findColumnById(id);

  return (
    <div
      className={column.isHighlighted ? classes.highlighted : classes.column}
    >
      <h2>{column.id}</h2>
      {column.draggables.map((draggable) => (
        <Card key={draggable.id} draggableId={draggable.id} />
      ))}

      <DropZone id={id} />
    </div>
  );
};
