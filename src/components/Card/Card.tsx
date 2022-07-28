import {
  Card,
  CardContent,
  CardHeader,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";

interface CardMainProps {
  title: string;
}

export const CardMainPage: FC<CardMainProps> = ({ title }) => {
  return (
    <Card sx={{ p: 3.25 }}>
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
          <Typography>Priority:</Typography>
          <Typography>Date:</Typography>
          <Link href="#" underline="always" variant="body2">
            Show more info &gt;&gt;
          </Link>
        </Stack>
      </CardContent>
    </Card>
  );
};
