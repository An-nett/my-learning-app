import { FC } from "react";
import {
  ProgressBarFill,
  ProgressBarMain,
  ProgressBarStyledProps,
} from "./ProgressBar.styled";

interface ProgressBarProps extends ProgressBarStyledProps {}

export const ProgressBar: FC<ProgressBarProps> = ({ total, value }) => {
  return (
    <ProgressBarMain className="progress">
      <ProgressBarFill total={total} value={value} />
    </ProgressBarMain>
  );
};
