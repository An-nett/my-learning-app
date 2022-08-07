import { Button, List, Stack } from "@mui/material";
import { FC } from "react";
import { SkillItem } from "../components/StepItem/StepItem";
import { SkillTitle } from "../components/SkillTitle/SkillTitle";

export const SkillPage: FC = () => {
  return (
    <Stack spacing={2}>
      <SkillTitle />
      <List
        sx={(theme) => ({
          border: `2px solid ${theme.palette.info.light}`,
          borderRadius: theme.spacing(1),
          p: 3,
        })}
      >
        <SkillItem title="Example step 1" datePlan="2022-05-06" isDone />
        <SkillItem title="Example step 2" datePlan="2022-07-22" />
        <SkillItem title="Example step 3" datePlan="2022-08-22" />
      </List>
      <Button
        variant="outlined"
        color="secondary"
        size="large"
        sx={{ alignSelf: "center" }}
      >
        Add new step
      </Button>
    </Stack>
  );
};
