import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  type ReactNode,
} from "react";
import { ColumnsObject } from "../utils/ColumnsObject";

interface Context {
  columns: ColumnsObject;
  setColumns: Dispatch<SetStateAction<ColumnsObject>>;
}

export const dndContext = createContext<Context>({
  columns: new ColumnsObject({ columns: [] }),
  setColumns: () => {},
});

interface DNDProviderProps {
  children: ReactNode;
  data: string;
}

export const DNDProvider = ({ children, data }: DNDProviderProps) => {
  const [columns, setColumns] = useState<ColumnsObject>(
    new ColumnsObject({ data })
  );

  const value = {
    columns,
    setColumns,
  };

  return <dndContext.Provider value={value}>{children}</dndContext.Provider>;
};
