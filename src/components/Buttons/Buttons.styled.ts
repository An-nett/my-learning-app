import { IconButton, styled } from "@mui/material";
import { TimeVariants } from "../../types/types";
import { getTimeStyle } from "../../utils/style";

interface ScrollButtonProps {
  time: TimeVariants;
  top?: boolean;
}

export const ScrollButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "time" && prop !== "top",
})<ScrollButtonProps>(({ theme, time, top = false }) => ({
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
