import { useKanban } from "../hooks/useKanban";
import { Column } from "./Column";

import classes from "./Columns.module.css";

export const Columns = () => {
  const { columns } = useKanban();

  return (
    <div className={classes.columns}>
      {columns.map((column) => (
        <Column key={column.id} id={column.id} />
      ))}
    </div>
  );
};
