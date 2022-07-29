import { AppBar, Button, styled } from "@mui/material";

export const HeaderStyled = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.info.light,
  paddingRight: theme.spacing(7.5),
  paddingLeft: theme.spacing(7.5),
}));

export const HeaderButtonStyled = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.info.main,
  color: theme.palette.common.white,
  padding: theme.spacing(1.5, 5.5),
}));
