import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { FC } from "react";

export const Header: FC = () => {
  return (
    <AppBar position="static" sx={{ px: 7.5 }}>
      <Toolbar>
        <Typography variant="h1" sx={{ flexGrow: 1 }}>
          My Learning App
        </Typography>
        <Button color="inherit" sx={{ py: 1.5, px: 5.5 }}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};
