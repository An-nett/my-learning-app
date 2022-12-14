import { Delete, Edit } from "@mui/icons-material";
import {
  alpha,
  ButtonGroup,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import { FC, useCallback, useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetStepsQuery,
  useUpdateStepsMutation,
} from "../../../services/skills";
import { inputDate, mainDate } from "../../../types/date-format";
import { StepData, TimeVariants } from "../../../types/types";
import { SAVING_CHANGES, STEP_PLACEHOLDER } from "../../../utils/text";
import { ActionButton, DoneButton } from "../../Buttons/Buttons.styled";

interface StepItemProps extends StepData {}

enum StepActionTypes {
  TITLE = "TITLE",
  DATE = "DATE",
  CONDITION = "CONDITION",
}

interface StepAction {
  type: StepActionTypes;
  payload: string | number | boolean;
}

function stepReducer(state: Omit<StepItemProps, "steps">, action: StepAction) {
  switch (action.type) {
    case StepActionTypes.TITLE:
      return { ...state, title: action.payload as string };
    case StepActionTypes.DATE:
      return { ...state, date: action.payload as string | number };
    case StepActionTypes.CONDITION:
      return { ...state, isDone: action.payload as boolean };
    default:
      return state;
  }
}

export const StepItem: FC<StepItemProps> = ({
  id,
  title,
  date,
  isDone = false,
}) => {
  const [hover, setHover] = useState(false);
  const [editMode, setEditMode] = useState(!title && !date);

  const { time, skillId } = useParams() as {
    time: TimeVariants;
    skillId: string;
  };

  const { data: steps = [] } = useGetStepsQuery({
    id: skillId,
    time,
  });

  const [stepState, changeStepState] = useReducer(stepReducer, {
    id,
    title,
    date,
    isDone,
  });

  const [updateSteps, { isLoading }] = useUpdateStepsMutation();

  useEffect(() => {
    if (steps) {
      const step = steps.find((step) => step.id === id);

      step?.title &&
        changeStepState({ type: StepActionTypes.TITLE, payload: step.title });
      step?.date &&
        changeStepState({ type: StepActionTypes.DATE, payload: step.date });
      typeof step?.isDone === "boolean" &&
        changeStepState({
          type: StepActionTypes.CONDITION,
          payload: step.isDone,
        });
    }
  }, [steps, id]);

  const toggleEditMode = useCallback(() => {
    setEditMode((prevMode) => !prevMode);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setHover(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  const handleDoneClick = useCallback(() => {
    setEditMode(false);
    setHover(false);

    updateSteps({
      id: skillId,
      time,
      steps: [
        ...steps.filter((step) => step.id !== id),
        { ...stepState, isDone: true },
      ],
    });
  }, [skillId, stepState, time, steps, updateSteps, id]);

  const handleNotDoneClick = useCallback(() => {
    setEditMode(false);
    setHover(false);

    updateSteps({
      id: skillId,
      time,
      steps: [
        ...steps.filter((step) => step.id !== id),
        { ...stepState, isDone: false },
      ],
    });
  }, [skillId, stepState, time, steps, updateSteps, id]);

  const handleTitleChange = useCallback((e: React.BaseSyntheticEvent) => {
    changeStepState({ type: StepActionTypes.TITLE, payload: e.target.value });
  }, []);
  const handleDateChange = useCallback((e: React.BaseSyntheticEvent) => {
    changeStepState({ type: StepActionTypes.DATE, payload: e.target.value });
  }, []);

  const handleDeleteStep = useCallback(() => {
    updateSteps({
      id: skillId,
      time,
      steps: steps.filter((step) => step.id !== id),
    });
  }, [time, skillId, id, steps, updateSteps]);

  if (isLoading) {
    return (
      <ListItem sx={{ px: 2, py: 3, "&:not(:last-child)": { mb: 2 } }}>
        <Typography>{SAVING_CHANGES}</Typography>
      </ListItem>
    );
  }

  if (!steps?.find((step) => step.id === id)) {
    return null;
  }

  return (
    <ListItem sx={{ p: 0, "&:not(:last-child)": { mb: 2 } }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={3}
        alignItems={{ xs: "stretch", md: "center" }}
        px={3}
        py={2}
        flexGrow={1}
        sx={(theme) => ({
          backgroundColor: alpha(theme.palette.info.light, 0.3),
          borderRadius: 1,
        })}
      >
        {editMode ? (
          <TextField
            variant="outlined"
            value={stepState.title ?? ""}
            placeholder={STEP_PLACEHOLDER}
            onChange={handleTitleChange}
            autoFocus
            size="small"
            sx={{ flexGrow: 1 }}
            InputProps={{
              sx: (theme) => ({
                backgroundColor: theme.palette.common.white,
                borderRadius: 1,
                "& .MuiOutlinedInput-input": {
                  p: theme.spacing(0, 1),
                },
              }),
            }}
          />
        ) : (
          <Typography flexGrow={1}>{stepState.title}</Typography>
        )}
        <Stack
          direction="row"
          spacing={4}
          justifyContent="flex-end"
          alignItems="center"
        >
          {editMode ? (
            <TextField
              variant="standard"
              size="small"
              value={stepState.date ?? moment().format(inputDate)}
              onChange={handleDateChange}
              InputProps={{
                type: "date",
                sx: { "& .MuiInput-input": { fontSize: 20 } },
              }}
            />
          ) : !stepState.isDone ? (
            <Typography
              sx={(theme) => ({
                color: moment(stepState.date).isAfter()
                  ? "initial"
                  : theme.palette.warning.dark,
              })}
            >
              {moment(stepState.date).format(mainDate)}
            </Typography>
          ) : null}
          {editMode ? (
            <ButtonGroup variant="text">
              <DoneButton isDone onClick={handleDoneClick}>
                done
              </DoneButton>
              <DoneButton onClick={handleNotDoneClick}>not yet</DoneButton>
            </ButtonGroup>
          ) : (
            <DoneButton
              isDone={stepState.isDone}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={toggleEditMode}
            >
              {hover || editMode ? (
                <Edit />
              ) : stepState.isDone ? (
                "done"
              ) : (
                "not yet"
              )}
            </DoneButton>
          )}
          <ActionButton color="error" onClick={handleDeleteStep}>
            <Delete />
          </ActionButton>
        </Stack>
      </Stack>
    </ListItem>
  );
};
