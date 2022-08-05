import { ArrowBack, Edit } from "@mui/icons-material";
import { alpha, IconButton, Stack, TextField, Typography } from "@mui/material";
import { FC, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActionButton } from "../Buttons/Buttons.styled";

export const SkillTitle: FC = () => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("Skill Name");

  const navigate = useNavigate();

  const toggleEditMode = useCallback(() => {
    setEditMode((prevMode) => !prevMode);
  }, []);
  const handleTitleChange = useCallback((e: React.BaseSyntheticEvent) => {
    setTitle(e.target.value);
  }, []);

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
          value={title}
          onChange={handleTitleChange}
          variant="standard"
          size="small"
          color="secondary"
          sx={{ flexGrow: 1 }}
        />
      ) : (
        <Typography variant="overline" flexGrow={1}>
          {title}
        </Typography>
      )}
      <ActionButton onClick={toggleEditMode}>
        <Edit />
      </ActionButton>
    </Stack>
  );
};
