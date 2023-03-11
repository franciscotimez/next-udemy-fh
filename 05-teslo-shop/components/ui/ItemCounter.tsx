import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";

interface Props {}

export const ItemCounter: React.FunctionComponent<Props> = () => {
  return (
    <Box display="flex" alignItems="center">
      <IconButton>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: "center" }}>1</Typography>
      <IconButton>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
