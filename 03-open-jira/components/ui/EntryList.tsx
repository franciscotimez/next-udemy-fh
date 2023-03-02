import React, { useContext, useMemo } from "react";
import { List, Paper } from "@mui/material";

import { EntriesContext } from "../../context/entries";
import { EntryStatus } from "../../interfaces";
import { EntryCard } from "./";

interface Props {
  status: EntryStatus;
}

export const EntryList: React.FunctionComponent<Props> = ({ status }) => {
  const { entries } = useContext(EntriesContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries, status]
  );

  return (
    // todo: Aqui haremos drop
    <div>
      <Paper
        sx={{
          height: "calc(100vh - 180px)",
          overflow: "auto",
          backgroundColor: "transparent",
          padding: "1px 5px",
        }}
      >
        {/* todo depende del drag */}
        <List sx={{ opacity: 1 }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
