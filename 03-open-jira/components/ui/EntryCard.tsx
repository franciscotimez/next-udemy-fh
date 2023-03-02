import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardActions,
} from "@mui/material";
import { Entry } from "../../interfaces";

interface Props {
  entry: Entry;
}

export const EntryCard: React.FunctionComponent<Props> = ({ entry }) => {

  const onDragStart = (event: React.DragEvent) => {
    console.log({event});
    event.dataTransfer.setData('text', entry._id)
  }

  const onDragEnd = () => {}

  return (
    <Card
      sx={{
        marginBottom: 1,
      }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      // eventos de drag
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}
        >
          <Typography variant="body2">{entry.createdAt}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
