import {
  Button,
  CircularProgress,
  List,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useCallback } from "react";
import {
  useGetStepsQuery,
  useUpdateStepsMutation,
} from "../../services/skills";
import { TimeVariants } from "../../types/types";
import { NO_STEPS } from "../../utils/text";
import { StepItem } from "./StepItem/StepItem";

interface StepsProps {
  id: string;
  time: TimeVariants;
}

export const Steps: FC<StepsProps> = ({ id, time }) => {
  const { data: steps, isFetching } = useGetStepsQuery({
    id,
    time,
  });

  const [updateSteps] = useUpdateStepsMutation();

  const onAddNewStep = useCallback(() => {
    updateSteps({
      id,
      time,
      steps: [
        ...(steps ?? []),
        { id: +(Number(id ?? 0) + Math.random() * 1000).toFixed(0) },
      ],
    });
  }, [id, time, steps, updateSteps]);

  return (
    <>
      <List
        sx={(theme) => ({
          border: `2px solid ${theme.palette.info.light}`,
          borderRadius: theme.spacing(1),
          p: 3,
        })}
      >
        {!isFetching ? (
          !steps?.length ? (
            <Typography>{NO_STEPS}</Typography>
          ) : (
            (steps ?? []).map((step) => (
              <StepItem
                id={step.id}
                key={step.id}
                title={step.title}
                date={step.date}
                isDone={step.isDone}
              />
            ))
          )
        ) : (
          <Stack
            alignItems="center"
            justifyContent="center"
            width="100%"
            mb={2}
          >
            <CircularProgress size={30} />
          </Stack>
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
    </>
  );
};
