import {
  ArrowForward,
  Dehaze,
  KeyboardDoubleArrowDown,
  KeyboardDoubleArrowUp,
} from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import { FC } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { mainDate } from "../../types/date-format";
import { PriorityTypes, SkillData, TimeVariants } from "../../types/types";
import { getTimeStyle } from "../../utils/style";
import { ProgressBar } from "./ProgressBar/ProgressBar";

interface CardMainProps extends SkillData {}

const PriorityIcon: FC<{ priority: PriorityTypes }> = ({ priority }) => {
  if (priority === PriorityTypes.high) {
    return <KeyboardDoubleArrowUp color="warning" />;
  }
  if (priority === PriorityTypes.medium) {
    return <Dehaze color="info" />;
  }
  return <KeyboardDoubleArrowDown color="success" />;
};

export const CardMainPage: FC<CardMainProps> = ({
  id,
  title,
  time,
  date,
  priority = PriorityTypes.low,
  steps,
}) => {
  const navigate = useNavigate();

  const value = steps.filter((step) => step.isDone).length;
  const total = steps.length;

  return (
    <Card sx={{ p: { xs: 2, sm: 3 }, position: "relative", flexShrink: 0 }}>
      <CardHeader
        title={
          <Link
            variant="h3"
            underline="none"
            color={getTimeStyle(time, false)}
            component={RouterLink}
            to={`${time}/${id}`}
          >
            {title}
          </Link>
        }
        action={
          <IconButton
            onClick={() => navigate(`${time}/${id}`)}
            sx={(theme) => ({
              backgroundColor: getTimeStyle(time),
              borderRadius: 0.5,
              p: 0.5,
              ml: 1,
              display: "none",
              [theme.breakpoints.between("sm", "md")]: {
                display: "inline-flex",
              },
            })}
          >
            <ArrowForward />
          </IconButton>
        }
        sx={{
          pt: { xs: 0.25, lg: 0.75 },
          pb: 2,
          pl: { xs: 1, sm: 2 },
        }}
      ></CardHeader>
      <CardContent
        sx={{ pt: 0, "&:last-child": { pb: 0 }, pl: { xs: 1, sm: 2 } }}
      >
        <Stack spacing={2} mb={{ xs: 4, md: 2 }}>
          <Typography
            display="inline-flex"
            alignItems="center"
            sx={{ "& svg": { ml: 2 } }}
          >
            Priority: <PriorityIcon priority={priority} />
          </Typography>
          <Typography sx={{ "& span": { fontStyle: "italic" } }}>
            Date: <span>{moment(date).format(mainDate)}</span>
          </Typography>
          <Link
            underline="always"
            variant="body2"
            color={getTimeStyle(time, false)}
            display={{ xs: "none", md: "inline-block" }}
            component={RouterLink}
            to={`${time}/${id}`}
          >
            Show more info &gt;&gt;
          </Link>
        </Stack>
        {time === TimeVariants.now && (
          <ProgressBar total={total} value={value} />
        )}
      </CardContent>
    </Card>
  );
};
