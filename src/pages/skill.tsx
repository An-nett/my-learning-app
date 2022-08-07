import { Button, List, Stack, Typography } from "@mui/material";
import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { StepItem } from "../components/StepItem/StepItem";
import { SkillTitle } from "../components/SkillTitle/SkillTitle";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { TimeVariants, URL } from "../types/types";
import { actions } from "../redux/slices/skills";

export const SkillPage: FC = () => {
  const { time, skillId } = useParams() as {
    time: TimeVariants;
    skillId: string;
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const skillData = useAppSelector((state) =>
    state.skills[time]?.find((it) => it.id === Number(skillId))
  );

  const onAddNewStep = useCallback(() => {
    dispatch(actions.addStep({ time, id: Number(skillId) }));
  }, [dispatch, time, skillId]);

  if (!skillData)
    return (
      <Stack spacing={10}>
        <Typography variant="h1" component="p" textAlign="center">
          Sorry, the skill with given id was not found...
        </Typography>
        <Button
          variant="outlined"
          color="info"
          size="large"
          sx={{ alignSelf: "center" }}
          onClick={() => navigate(URL.MAIN)}
        >
          Go to main page
        </Button>
      </Stack>
    );

  return (
    <Stack spacing={2}>
      <SkillTitle time={time} id={skillId} title={skillData.title} />
      <List
        sx={(theme) => ({
          border: `2px solid ${theme.palette.info.light}`,
          borderRadius: theme.spacing(1),
          p: 3,
        })}
      >
        {!skillData.steps.length ? (
          <Typography>
            There are no steps yet. Please add some learning steps!
          </Typography>
        ) : (
          skillData.steps.map((step) => (
            <StepItem
              id={step.id}
              key={step.title}
              title={step.title}
              date={step.date}
              isDone={step.isDone}
            />
          ))
        )}
      </List>
      <Button
        variant="outlined"
        color="secondary"
        size="large"
        sx={{ alignSelf: "center" }}
        onClick={onAddNewStep}
      >
        Add new step
      </Button>
    </Stack>
  );
};
