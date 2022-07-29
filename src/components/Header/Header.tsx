import { Toolbar, Typography } from "@mui/material";
import { FC } from "react";
import { HeaderButtonStyled, HeaderStyled } from "./Header.styled";

export const Header: FC = () => {
  return (
    <HeaderStyled position="static">
      <Toolbar>
        <Typography variant="h1" sx={{ flexGrow: 1 }}>
          My Learning App
        </Typography>
        <HeaderButtonStyled>Login</HeaderButtonStyled>
      </Toolbar>
    </HeaderStyled>
  );
};
