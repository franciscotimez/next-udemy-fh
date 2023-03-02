import React, { useContext, useMemo } from "react";
import { List, Paper } from "@mui/material";

import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";
import { EntryStatus } from "../../interfaces";
import { EntryCard } from "./";

import styles from "./EntryList.module.css";

interface Props {
  status: EntryStatus;
}

export const EntryList: React.FunctionComponent<Props> = ({ status }) => {
  const { isDragging, endDragging } = useContext(UIContext);
  const { entries, updateEntry } = useContext(EntriesContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries, status]
  );

  const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDropEntry = (event: React.DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData("text");

    const entry = entries.find((entry) => entry._id === id)!;
    entry.status = status;
    updateEntry(entry);
    endDragging();
  };

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ""}
    >
      <Paper
        sx={{
          height: "calc(100vh - 180px)",
          overflow: "auto",
          backgroundColor: "transparent",
          padding: "1px 5px",
        }}
      >
        {/* todo depende del drag */}
        <List sx={{ opacity: isDragging ? 0.3 : 1, transition: "all .3" }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
