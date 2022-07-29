import {
  Card,
  CardContent,
  CardHeader,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import { FC } from "react";
import { mainDate } from "../../types/date-format";
import {
  PriorityTypes,
  PriorityTypesTitles,
  TimeVariants,
} from "../../types/types";
import { getTimeStyle } from "../../utils/style";
import { ProgressBar } from "./ProgressBar/ProgressBar";

interface CardMainProps {
  title: string;
  time: TimeVariants;
  date: Date | number | string;
  priority: PriorityTypes;
}

export const CardMainPage: FC<CardMainProps> = ({
  title,
  time,
  date,
  priority,
}) => {
  return (
    <Card sx={{ p: 3.25, pr: 6.5, position: "relative" }}>
      <CardHeader
        title={
          <Link href="#" variant="h3" underline="none" color="inherit">
            {title}
          </Link>
        }
        sx={{ pt: 0.75 }}
      ></CardHeader>
      <CardContent sx={{ pt: 1, "&:last-child": { pb: 0 } }}>
        <Stack spacing={3}>
          <Typography>Priority: {PriorityTypesTitles[priority]}</Typography>
          <Typography>Date: {moment(date).format(mainDate)}</Typography>
          <Link
            href="#"
            underline="always"
            variant="body2"
            color={getTimeStyle(time, false)}
          >
            Show more info &gt;&gt;
          </Link>
        </Stack>
        {time === TimeVariants.now && <ProgressBar total={100} value={10} />}
      </CardContent>
    </Card>
  );
};
