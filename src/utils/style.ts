import theme from "../theme/theme";
import { TimeVariants } from "../types/types";

export const getTimeStyle = (time: TimeVariants, isLight = true) =>
  time === TimeVariants.past
    ? theme.palette.success[isLight ? "light" : "dark"]
    : time === TimeVariants.now
    ? theme.palette.secondary[isLight ? "light" : "dark"]
    : theme.palette.common.black;
