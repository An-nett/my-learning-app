import { Edit } from "@mui/icons-material";
import {
  alpha,
  ButtonGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import { FC, useCallback, useState } from "react";
import { mainDate } from "../../types/date-format";
import { DoneButton } from "../Buttons/Buttons.styled";

// TODO Пока пропсы не меняются, т.к. нет связи с редаксом, после создания дописать тесты

interface SkillItemProps {
  title: string;
  datePlan: string;
  isDone?: boolean;
}

export const SkillItem: FC<SkillItemProps> = ({
  title,
  datePlan,
  isDone = false,
}) => {
  const [hover, setHover] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [inputTitle, setTitle] = useState(title);
  const [date, setDate] = useState(datePlan);

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

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={3}
      alignItems={{ xs: "stretch", md: "center" }}
      px={3}
      py={2}
      sx={(theme) => ({
        backgroundColor: alpha(theme.palette.info.light, 0.3),
        borderRadius: 1,
      })}
    >
      {editMode ? (
        <TextField
          variant="outlined"
          value={inputTitle}
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
            value={date}
            onChange={handleDateChange}
            InputProps={{
              type: "date",
              sx: { "& .MuiInput-input": { fontSize: 20 } },
            }}
          />
        ) : !isDone ? (
          <Typography
            sx={(theme) => ({
              color: moment(date).isAfter()
                ? "initial"
                : theme.palette.warning.dark,
            })}
          >
            {moment(date).format(mainDate)}
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
      </Stack>
    </Stack>
  );
};
