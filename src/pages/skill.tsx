import {
  Button,
  CircularProgress,
  List,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StepItem } from "../components/StepItem/StepItem";
import { SkillTitle } from "../components/SkillTitle/SkillTitle";
import { useParams } from "react-router-dom";
import { TimeVariants, URL } from "../types/types";
import { useGetSkillQuery } from "../services/skills";

export const SkillPage: FC = () => {
  const { time, skillId: id } = useParams() as {
    time: TimeVariants;
    skillId: string;
  };
  const navigate = useNavigate();

  const [isAdding, setIsAdding] = useState(false);

  const { data: skillData, isFetching } = useGetSkillQuery({ id, time });

  const { title, steps, priority = 0 } = skillData ?? {};

  const onAddNewStep = useCallback(() => {
    setIsAdding(true);
  }, []);

  const onSaveStep = useCallback(() => {
    setIsAdding(false);
  }, []);

  if (isFetching) {
    return (
      <Stack alignItems="center" pt={8}>
        <CircularProgress size={40} />
      </Stack>
    );
  }

  if (!id)
    return (
      <Stack spacing={10}>
        <Typography variant="h1" component="p" textAlign="center">
          Sorry, the skill with given id was not found or is not loaded yet...
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
      <SkillTitle {...{ time, id, title, priority }} />
      <List
        sx={(theme) => ({
          border: `2px solid ${theme.palette.info.light}`,
          borderRadius: theme.spacing(1),
          p: 3,
        })}
      >
        {!steps?.length && !isAdding ? (
          <Typography>
            There are no steps yet. Please add some learning steps!
          </Typography>
        ) : (
          steps?.map((step) => (
            <StepItem
              id={step.id}
              key={step.id}
              title={step.title}
              date={step.date}
              isDone={step.isDone}
            />
          ))
        )}
        {isAdding && (
          <StepItem
            id={+(Number(id ?? 0) + Math.random() * 1000).toFixed(0)}
            onSave={onSaveStep}
          />
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
