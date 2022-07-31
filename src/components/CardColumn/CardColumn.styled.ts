import { alpha, Stack, styled, Typography } from "@mui/material";
import { TimeVariants } from "../../types/types";
import { getTimeStyle } from "../../utils/style";

export interface CardTrackStyledProps {
  time: TimeVariants;
}

export const CardTrackStyled = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "time",
})<CardTrackStyledProps>(({ theme, time }) => ({
  backgroundColor: alpha(getTimeStyle(time), 0.2),
  flexGrow: 1,
  minHeight: "20vh",
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1),
}));

export const ColumnTitleStyled = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "time",
})<CardTrackStyledProps>(({ theme, time }) => ({
  backgroundColor: getTimeStyle(time),
  color: theme.palette.common.white,
  width: "50%",
  margin: `0 auto ${theme.spacing(2)}`,
  textAlign: "center",
  borderRadius: theme.spacing(0.5),
}));
