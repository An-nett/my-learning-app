import { Edit } from "@mui/icons-material";
import { alpha, Button, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { ActionButton } from "../components/Buttons/Buttons.styled";
import { SkillItem } from "../components/SkillItem/SkillItem";

export const SkillPage: FC = () => {
  return (
    <Stack spacing={2}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        px={3}
        py={2}
        sx={(theme) => ({
          backgroundColor: alpha(theme.palette.secondary.light, 0.5),
          borderRadius: theme.spacing(1),
        })}
      >
        <Typography variant="overline">Skill Name</Typography>
        <ActionButton>
          <Edit />
        </ActionButton>
      </Stack>
      <Stack
        spacing={3}
        p={3}
        sx={(theme) => ({
          border: `2px solid ${theme.palette.info.light}`,
          borderRadius: theme.spacing(1),
        })}
      >
        <SkillItem title="Example step 1" datePlan="2022-05-06" isDone />
        <SkillItem title="Example step 2" datePlan="2022-07-22" />
        <SkillItem title="Example step 3" datePlan="2022-08-22" />
      </Stack>
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
