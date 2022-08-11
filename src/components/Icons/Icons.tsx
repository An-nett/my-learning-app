import {
  Dehaze,
  KeyboardDoubleArrowDown,
  KeyboardDoubleArrowUp,
} from "@mui/icons-material";
import { FC } from "react";
import { PriorityTypes } from "../../types/types";

export const PriorityIcon: FC<{ priority: PriorityTypes }> = ({ priority }) => {
  if (priority === PriorityTypes.high) {
    return <KeyboardDoubleArrowUp color="warning" />;
  }
  if (priority === PriorityTypes.medium) {
    return <Dehaze color="info" />;
  }
  return <KeyboardDoubleArrowDown color="success" />;
};
