import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";

interface Props {
  currentValue: number;
  maxValue: number;
  onUpdateValue: (newValue: number) => void;
}

export const ItemCounter: React.FunctionComponent<Props> = ({
  currentValue,
  maxValue,
  onUpdateValue,
}) => {
  const updateValue = (increment: number) => {
    let newValue = currentValue + increment;

    if (newValue === 0) newValue = 1;
    if (newValue > maxValue) newValue = maxValue;
    onUpdateValue(newValue);
  };

  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={() => updateValue(-1)}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: "center" }}>{currentValue}</Typography>
      <IconButton onClick={() => updateValue(1)}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
