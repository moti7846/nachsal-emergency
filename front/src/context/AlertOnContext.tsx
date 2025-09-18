import { createContext } from "react";

type AlertType = {
  alert: boolean;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AlertContext = createContext<AlertType | null>(null);
