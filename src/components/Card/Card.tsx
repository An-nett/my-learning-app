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
    <Card sx={{ p: 3.25, pr: 6.5, position: "relative", flexShrink: 0 }}>
      <CardHeader
        title={
          <Link href="#" variant="h3" underline="none" color="inherit">
            {title}
          </Link>
        }
        action={
          <Link
            href="#"
            underline="none"
            variant="body2"
            color={getTimeStyle(time, false)}
            sx={(theme) => ({
              [theme.breakpoints.up("md")]: { display: "none" },
            })}
          >
            &gt;&gt;
          </Link>
        }
        sx={(theme) => ({
          pt: 0.75,
          pb: 2,
          [theme.breakpoints.down("lg")]: { pt: 0.25 },
        })}
      ></CardHeader>
      <CardContent sx={{ pt: 0, "&:last-child": { pb: 0 } }}>
        <Stack
          spacing={2}
          sx={(theme) => ({ [theme.breakpoints.down("md")]: { mb: 4 } })}
        >
          <Typography>Priority: {PriorityTypesTitles[priority]}</Typography>
          <Typography>Date: {moment(date).format(mainDate)}</Typography>
          <Link
            href="#"
            underline="always"
            variant="body2"
            color={getTimeStyle(time, false)}
            sx={(theme) => ({
              [theme.breakpoints.down("md")]: { display: "none" },
            })}
          >
            Show more info &gt;&gt;
          </Link>
        </Stack>
        {time === TimeVariants.now && <ProgressBar total={100} value={10} />}
      </CardContent>
    </Card>
  );
};
