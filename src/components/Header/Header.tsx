import { Toolbar, Typography } from "@mui/material";
import { FC, useCallback } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { actions } from "../../redux/slices/auth";
import { HeaderButtonStyled, HeaderStyled } from "./Header.styled";

export const Header: FC = () => {
  const dispatch = useAppDispatch();
  const handleLoginOpen = useCallback(() => {
    dispatch(actions.toggleModal(true));
  }, [dispatch]);

  return (
    <HeaderStyled position="static">
      <Toolbar>
        <Typography variant="h1" sx={{ flexGrow: 1 }}>
          My Learning App
        </Typography>
        <HeaderButtonStyled onClick={handleLoginOpen}>Login</HeaderButtonStyled>
      </Toolbar>
    </HeaderStyled>
  );
};
