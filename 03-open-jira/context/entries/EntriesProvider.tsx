import { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";

export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti, atque.",
      createdAt: Date.now(),
      status: "pending",
    },
    {
      _id: uuidv4(),
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti, atque.",
      createdAt: Date.now() - 1000000,
      status: "in-process",
    },
    {
      _id: uuidv4(),
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti, atque.",
      createdAt: Date.now() - 100000,
      status: "finished",
    },
  ],
};

export const EntriesProvider: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

  const addEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: "pending",
    };

    dispatch({ type: "[Entries] - Add Entry", payload: newEntry });
  };

  const updateEntry = (entry: Entry) => {
    dispatch({ type: "[Entries] - Entry Updated", payload: entry });
  };

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
