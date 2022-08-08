import { Delete, Edit } from "@mui/icons-material";
import {
  alpha,
  ButtonGroup,
  IconButton,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import { FC, useCallback, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { actions } from "../../redux/slices/skills";
import { mainDate } from "../../types/date-format";
import { StepData, TimeVariants } from "../../types/types";
import { DoneButton } from "../Buttons/Buttons.styled";

interface StepItemProps extends StepData {}

enum StepActionTypes {
  TITLE = "TITLE",
  DATE = "DATE",
  CONDITION = "CONDITION",
}

interface StepAction {
  type: StepActionTypes;
  payload: string;
}

function stepReducer(state: StepItemProps, action: StepAction) {
  switch (action.type) {
    case StepActionTypes.TITLE:
      return { ...state, title: action.payload };
    case StepActionTypes.DATE:
      return { ...state, date: action.payload };
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

  const [stepState, changeStepState] = useReducer(stepReducer, {
    id,
    title,
    date,
  });

  const dispatch = useAppDispatch();
  const { time, skillId } = useParams() as {
    time: TimeVariants;
    skillId: string;
  };

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

    dispatch(
      actions.changeStep({
        time,
        id: Number(skillId),
        stepData: { ...stepState, isDone: true },
      })
    );
  }, [dispatch, skillId, stepState, time]);

  const handleNotDoneClick = useCallback(() => {
    setEditMode(false);
    setHover(false);

    dispatch(
      actions.changeStep({
        time,
        id: Number(skillId),
        stepData: { ...stepState, isDone: false },
      })
    );
  }, [dispatch, skillId, stepState, time]);

  const handleTitleChange = useCallback((e: React.BaseSyntheticEvent) => {
    changeStepState({ type: StepActionTypes.TITLE, payload: e.target.value });
  }, []);
  const handleDateChange = useCallback((e: React.BaseSyntheticEvent) => {
    changeStepState({ type: StepActionTypes.DATE, payload: e.target.value });
  }, []);

  const handleDeleteStep = useCallback(() => {
    dispatch(actions.removeStep({ time, id: Number(skillId), stepId: id }));
  }, [dispatch, time, skillId, id]);

  return (
    <ListItem sx={{ p: 0, "&:not(:last-child)": { mb: 2 } }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
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
            value={stepState.title}
            placeholder="Please enter step name..."
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
        <Stack direction="row" spacing={4} justifyContent="flex-end">
          {editMode ? (
            <TextField
              variant="standard"
              size="small"
              value={stepState.date}
              onChange={handleDateChange}
              InputProps={{
                type: "date",
                sx: { "& .MuiInput-input": { fontSize: 20 } },
              }}
            />
          ) : !isDone ? (
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
              isDone={isDone}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={toggleEditMode}
            >
              {hover || editMode ? <Edit /> : isDone ? "done" : "not yet"}
            </DoneButton>
          )}
          <IconButton color="error" onClick={handleDeleteStep}>
            <Delete />
          </IconButton>
        </Stack>
      </Stack>
    </ListItem>
  );
};
