import { createContext } from "react";

type AlertType = {
  alert: boolean;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
};

export  const AlartContext = createContext<AlertType | null>(null);
