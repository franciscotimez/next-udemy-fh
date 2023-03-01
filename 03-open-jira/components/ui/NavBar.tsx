import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

export const NavBar: React.FunctionComponent = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton size="large" edge="start">
          <MenuOutlinedIcon />
        </IconButton>
        <Typography variant="h6">OpenJira</Typography>
      </Toolbar>
    </AppBar>
  );
};
