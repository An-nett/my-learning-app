import { alpha, Box, Stack, styled, Theme } from "@mui/material";

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
  width: theme.spacing(3),
  borderRadius: theme.spacing(0.5),
  border: `2px solid ${alpha(theme.palette.common.black, 0.4)}`,
  padding: theme.spacing(0.25),
  [theme.breakpoints.down("md")]: {
    top: "unset",
    width: "unset",
    bottom: theme.spacing(2),
    left: theme.spacing(2),
    right: theme.spacing(2),
    justifyContent: "start",
  },
}));

export const ProgressBarFill = styled(Box, {
  shouldForwardProp: (prop) => prop !== "total" && prop !== "value",
})<ProgressBarStyledProps>(({ theme, total, value }) => {
  const percent = total === 0 ? 0 : (value * 100) / total;

  return {
    background: getGradient(theme, percent),
    height: `${percent}%`,
    borderRadius: theme.spacing(0.5),
    [theme.breakpoints.down("md")]: {
      background: getGradient(theme, percent, "right"),
      height: theme.spacing(3),
      width: `${percent}%`,
    },
  };
});

const getGradient = (theme: Theme, percent: number, direction = "top") => {
  if (percent <= 10) return theme.palette.error.main;
  if (percent <= 30)
    return `linear-gradient(to ${direction}, ${theme.palette.error.main} 0%, ${
      theme.palette.warning.light
    } ${(10 * 100) / percent}%)`;
  if (percent <= 50)
    return `linear-gradient(to ${direction}, ${theme.palette.error.main} 0%, ${
      theme.palette.warning.light
    } ${(10 * 100) / percent}%, ${theme.palette.success.light} 100%)`;
  return `linear-gradient(to ${direction}, ${theme.palette.error.main} 0%, ${
    theme.palette.warning.light
  } 10%, ${theme.palette.success.light} ${(70 * 100) / percent}%)`;
};
