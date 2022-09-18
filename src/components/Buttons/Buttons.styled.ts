import { Button, IconButton, styled } from "@mui/material";
import { TimeVariants } from "../../types/types";
import { getTimeStyle } from "../../utils/style";

interface ButtonProps {
  time: TimeVariants;
  top?: boolean;
}

export const ScrollButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "time" && prop !== "top",
})<ButtonProps>(({ theme, time, top = false }) => ({
  backgroundColor: getTimeStyle(time),
  position: "absolute",
  borderRadius: theme.spacing(0.5),
  left: top ? "unset" : "10%",
  right: top ? "10%" : "unset",
  padding: theme.spacing(1),
  "& svg": {
    transform: `rotate(${top ? "180" : "0"}deg)`,
    color: theme.palette.common.white,
  },
}));

export const ActionButton = styled(IconButton)(({ theme }) => ({
  borderRadius: theme.spacing(1),
}));

interface DoneButtonStyledProps {
  isDone?: boolean;
}

export const DoneButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isDone",
})<DoneButtonStyledProps>(({ theme, isDone = false }) => ({
  backgroundColor: theme.palette[isDone ? "success" : "error"].main,
  color: theme.palette.common.white,
  flexShrink: 0,
  minWidth: theme.spacing(isDone ? 20 : 26),
  alignSelf: "center",
  [theme.breakpoints.down("md")]: {
    marginLeft: "auto",
  },
  "&.MuiButton-root": {
    fontSize: 18,
  },
  "& svg": {
    height: theme.spacing(4.5),
  },
}));

export const AddButton = styled(IconButton)<ButtonProps>(({ theme, time }) => ({
  position: "absolute",
  right: "15%",
  top: "40%",
  transform: "translateY(-50%)",
  backgroundColor: getTimeStyle(time),
  borderRadius: theme.spacing(0.5),
  color: theme.palette.common.white,
  padding: 0,
  "&:hover": {
    color: getTimeStyle(time, false),
  },
}));

export const CloseButton = styled(IconButton)(({ theme }) => ({
  borderRadius: theme.spacing(0.5),
}));
