import { alpha, Box, Stack, styled } from "@mui/material";

export interface ProgressBarStyledProps {
  total: number;
  value: number;
}

export const ProgressBarMain = styled(Stack)(({ theme }) => ({
  justifyContent: "end",
  position: "absolute",
  right: theme.spacing(4),
  top: theme.spacing(3),
  bottom: theme.spacing(3),
  width: theme.spacing(2),
  borderRadius: theme.spacing(0.5),
  border: `2px solid ${alpha(theme.palette.common.black, 0.4)}`,
  padding: theme.spacing(0.25),
}));

export const ProgressBarFill = styled(Box, {
  shouldForwardProp: (prop) => prop !== "total" && prop !== "value",
})<ProgressBarStyledProps>(({ theme, total, value }) => ({
  backgroundColor: theme.palette.warning.light,
  height: `${total === 0 ? 0 : (value * 100) / total}%`,
  borderRadius: theme.spacing(0.5),
}));
