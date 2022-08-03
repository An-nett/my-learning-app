import { alpha, Box, Stack, styled, Typography } from "@mui/material";
import { TimeVariants } from "../../types/types";
import { getTimeStyle } from "../../utils/style";

export type TMaskType = "top" | "bottom" | "left" | "right" | "x" | "y";
export interface CardTrackStyledProps {
  time: TimeVariants;
  maskType?: TMaskType;
}

export const BackgroundTrackStyled = styled(Box, {
  shouldForwardProp: (prop) => prop !== "time",
})<CardTrackStyledProps>(({ theme, time }) => ({
  backgroundColor: alpha(getTimeStyle(time), 0.2),
  borderRadius: theme.spacing(1),
  flexGrow: 1,
}));

export const CardTrackStyled = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "time" && prop !== "maskType",
})<CardTrackStyledProps>(({ theme, time, maskType }) => {
  const isVertical =
    maskType === "y" || maskType === "top" || maskType === "bottom";
  const sidedMask = maskType === "y" || maskType === "x";
  const firstMask = maskType === "bottom" || maskType === "left";
  const secondMask = maskType === "top" || maskType === "right";

  return {
    flexGrow: 1,
    minHeight: "20vh",
    maxHeight: "75vh",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      width: 0,
      display: "none",
    },
    WebkitMask: maskType
      ? `border linear-gradient(${
          isVertical ? "0" : "90"
        }deg, transparent 0%, white ${sidedMask || firstMask ? 7 : 0}%, white ${
          sidedMask || secondMask ? 93 : 100
        }%, transparent 100%)`
      : "none",
  };
});

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
