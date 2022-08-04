import { Edit } from "@mui/icons-material";
import { alpha, Stack, Typography } from "@mui/material";
import moment from "moment";
import { FC, useState } from "react";
import { mainDate } from "../../types/date-format";
import { DoneButton } from "../Buttons/Buttons.styled";

interface SkillItemProps {
  title: string;
  datePlan: string;
  isDone?: boolean;
}

export const SkillItem: FC<SkillItemProps> = ({
  title,
  datePlan,
  isDone = false,
}) => {
  const [hover, setHover] = useState(false);
  return (
    <Stack
      direction="row"
      spacing={4}
      alignItems="center"
      px={3}
      py={2}
      sx={(theme) => ({
        backgroundColor: alpha(theme.palette.info.light, 0.3),
        borderRadius: theme.spacing(1),
      })}
    >
      <Typography flexGrow={1}>{title}</Typography>
      {!isDone && (
        <Typography
          sx={(theme) => ({
            color: moment(datePlan).isAfter()
              ? "initial"
              : theme.palette.warning.dark,
          })}
        >
          {moment(datePlan).format(mainDate)}
        </Typography>
      )}
      <DoneButton
        isDone={isDone}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {hover ? <Edit /> : isDone ? "done" : "not yet"}
      </DoneButton>
    </Stack>
  );
};
