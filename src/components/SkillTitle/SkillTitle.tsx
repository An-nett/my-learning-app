import { ArrowBack, Delete, Done, Edit } from "@mui/icons-material";
import {
  alpha,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useRemoveSkillMutation,
  useUpdateSkillMutation,
} from "../../services/skills";
import { PriorityTypes, TimeVariants, URL } from "../../types/types";
import { DEFAULT_TITLE, SAVING_CHANGES } from "../../utils/text";
import { ActionButton } from "../Buttons/Buttons.styled";
import { PriorityIcon } from "../Icons/Icons";

export const SkillTitle: FC<{
  time: TimeVariants;
  id: string;
  title?: string;
  priority: PriorityTypes;
}> = ({ time, id, title, priority }) => {
  const [editMode, setEditMode] = useState(!title);

  const [inputTitle, setInputTitle] = useState(title);
  const [iconPriority, setIconPriority] = useState(priority);

  const ref = useRef<HTMLInputElement | null>(null);

  const [removeSkill] = useRemoveSkillMutation();
  const [updateSkill, { isLoading, data }] = useUpdateSkillMutation();

  useEffect(() => {
    if (data?.title) {
      setInputTitle(data.title);
    }
    if (data?.priority) {
      setIconPriority(data.priority);
    }
  }, [data]);

  const navigate = useNavigate();

  const toggleEditMode = useCallback(() => {
    if (editMode && ref?.current) {
      updateSkill({
        id,
        time,
        priority: iconPriority,
        title: ref.current.value,
      });
    }
    setEditMode(!editMode);
  }, [editMode, time, id, iconPriority, updateSkill]);

  const handleDeleteSkill = useCallback(() => {
    removeSkill({ time, id });
    navigate(URL.MAIN);
  }, [time, id, navigate, removeSkill]);

  const handlePriorityChange = useCallback(() => {
    setIconPriority((prev) => (prev + 1 <= 2 ? prev + 1 : 0));
  }, []);

  if (isLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" width="100%">
        <CircularProgress size={30} />
      </Stack>
    );
  }

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
      <ActionButton
        color="secondary"
        sx={{ borderRadius: 0.5, p: 0 }}
        onClick={() => navigate(-1)}
      >
        <ArrowBack />
      </ActionButton>
      {editMode ? (
        <TextField
          autoFocus
          inputRef={ref}
          defaultValue={inputTitle}
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
      {editMode && (
        <ActionButton onClick={handlePriorityChange}>
          <PriorityIcon priority={iconPriority} />
        </ActionButton>
      )}
      <ActionButton onClick={toggleEditMode} disabled={!!isLoading}>
        {editMode ? <Done /> : <Edit />}
      </ActionButton>
      <ActionButton
        color="error"
        onClick={handleDeleteSkill}
        disabled={!!isLoading}
      >
        <Delete />
      </ActionButton>
    </Stack>
  );
};
