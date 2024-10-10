import { useContext } from "react";
import { dndContext } from "../components/DNDProvider";

export const useKanban = () => {
  const { columns, setColumns } = useContext(dndContext);

  const findColumnById = (id: string) => columns.findColumnById(id);
  const findColumnByDraggableId = (draggableId: string) =>
    columns.findColumnByDraggableId(draggableId);

  const findDraggableById = (id: string) => columns.findDraggableById(id);

  return {
    columns: columns.columns,
    setColumns,
    findColumnByDraggableId,
    findColumnById,
    findDraggableById,
  };
};
