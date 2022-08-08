import { ArrowBack, Delete, Done, Edit } from "@mui/icons-material";
import { alpha, IconButton, Stack, TextField, Typography } from "@mui/material";
import { FC, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { actions } from "../../redux/slices/skills";
import { TimeVariants, URL } from "../../types/types";
import { ActionButton } from "../Buttons/Buttons.styled";

export const DEFAULT_TITLE = "Enter skill name..";

export const SkillTitle: FC<{
  time: TimeVariants;
  id: string;
  title?: string;
}> = ({ time, id, title }) => {
  const [editMode, setEditMode] = useState(!title);
  const [inputTitle, setInputTitle] = useState(title);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const toggleEditMode = useCallback(() => {
    if (editMode && inputTitle) {
      dispatch(
        actions.changeTitle({ time, id: Number(id), title: inputTitle })
      );
    }
    setEditMode(!editMode);
  }, [editMode, inputTitle, time, id, dispatch]);

  const handleTitleChange = useCallback((e: React.BaseSyntheticEvent) => {
    setInputTitle(e.target.value);
  }, []);

  const handleDeleteSkill = useCallback(() => {
    dispatch(actions.removeSkill({ time, id: Number(id) }));
    navigate(URL.MAIN);
  }, [dispatch, time, id, navigate]);

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      px={3}
      py={2}
      sx={(theme) => ({
        backgroundColor: alpha(theme.palette.secondary.light, 0.5),
        borderRadius: theme.spacing(1),
      })}
    >
      <IconButton
        color="secondary"
        sx={{ borderRadius: 0.5, p: 0 }}
        onClick={() => navigate(-1)}
      >
        <ArrowBack />
      </IconButton>
      {editMode ? (
        <TextField
          autoFocus
          value={inputTitle}
          onChange={handleTitleChange}
          placeholder={DEFAULT_TITLE}
          variant="standard"
          size="small"
          color="secondary"
          sx={{ flexGrow: 1 }}
        />
      ) : (
        <Typography variant="overline" flexGrow={1}>
          {inputTitle}
        </Typography>
      )}
      <ActionButton onClick={toggleEditMode}>
        {editMode ? <Done /> : <Edit />}
      </ActionButton>
      <IconButton color="error" onClick={handleDeleteSkill}>
        <Delete />
      </IconButton>
    </Stack>
  );
};
