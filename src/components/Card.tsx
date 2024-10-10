import { useKanban } from "../hooks/useKanban";
import { Draggable } from "./Draggable";

import classes from "./Card.module.css";

export const Card = ({ draggableId }: { draggableId: string }) => {
  const { findDraggableById } = useKanban();

  const draggable = findDraggableById(draggableId);

  return (
    <Draggable
      className={draggable.isLifted ? classes.lifted : classes.card}
      id={draggableId}
    >
      {draggable.id}
    </Draggable>
  );
};
