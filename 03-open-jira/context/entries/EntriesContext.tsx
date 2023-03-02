import React, { createContext } from "react";
import { Entry } from "../../interfaces";

interface ContextProps {
  entries: Entry[];

  addEntry: (description: string) => void;
}

export const EntriesContext = createContext({} as ContextProps);
