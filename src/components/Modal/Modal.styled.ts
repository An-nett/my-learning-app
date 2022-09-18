import { Box, styled } from "@mui/material";

export const LoginFormStyled = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: theme.palette.common.white,
  padding: theme.spacing(5),
  border: `2px double ${theme.palette.primary.light}`,
  borderRadius: theme.spacing(1),
}));
