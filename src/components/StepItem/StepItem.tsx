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
import { FC, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { actions } from "../../redux/slices/skills";
import { mainDate } from "../../types/date-format";
import { StepData, TimeVariants } from "../../types/types";
import { DoneButton } from "../Buttons/Buttons.styled";

// TODO Пока пропсы не меняются, т.к. нет связи с редаксом, после создания дописать тесты

interface StepItemProps extends StepData {}

export const StepItem: FC<StepItemProps> = ({
  id,
  title,
  date,
  isDone = false,
}) => {
  const [hover, setHover] = useState(false);
  const [editMode, setEditMode] = useState(!title && !date);

  const [inputTitle, setTitle] = useState(title);
  const [datePlan, setDate] = useState(date);

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
  }, []);
  const handleNotDoneClick = useCallback(() => {
    setEditMode(false);
    setHover(false);
  }, []);

  const handleTitleChange = useCallback((e: React.BaseSyntheticEvent) => {
    setTitle(e.target.value);
  }, []);
  const handleDateChange = useCallback((e: React.BaseSyntheticEvent) => {
    setDate(e.target.value);
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
            value={inputTitle}
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
          <Typography flexGrow={1}>{inputTitle}</Typography>
        )}
        <Stack direction="row" spacing={4} justifyContent="flex-end">
          {editMode ? (
            <TextField
              variant="standard"
              size="small"
              value={datePlan}
              onChange={handleDateChange}
              InputProps={{
                type: "date",
                sx: { "& .MuiInput-input": { fontSize: 20 } },
              }}
            />
          ) : !isDone ? (
            <Typography
              sx={(theme) => ({
                color: moment(datePlan).isAfter()
                  ? "initial"
                  : theme.palette.warning.dark,
              })}
            >
              {moment(datePlan).format(mainDate)}
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
