import { ArrowBack, Delete, Done, Edit } from "@mui/icons-material";
import { alpha, Stack, TextField, Typography } from "@mui/material";
import { FC, useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useRemoveSkillMutation,
  useUpdateSkillMutation,
} from "../../services/skills";
import { PriorityTypes, TimeVariants, URL } from "../../types/types";
import { savingChanges } from "../../utils/text";
import { ActionButton } from "../Buttons/Buttons.styled";
import { PriorityIcon } from "../Icons/Icons";

export const DEFAULT_TITLE = "Enter skill name..";

export const SkillTitle: FC<{
  time: TimeVariants;
  id: string;
  title?: string;
  priority: PriorityTypes;
}> = ({ time, id, title, priority }) => {
  const [editMode, setEditMode] = useState(!title);
  const [iconPriority, setIconPriority] = useState(priority);

  const ref = useRef<HTMLInputElement | null>(null);

  const [removeSkill] = useRemoveSkillMutation();
  const [updateSkill, { isLoading }] = useUpdateSkillMutation();

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
          defaultValue={title}
          placeholder={DEFAULT_TITLE}
          variant="standard"
          size="small"
          color="secondary"
          sx={{ flexGrow: 1 }}
        />
      ) : (
        <Typography variant="overline" flexGrow={1}>
          {isLoading ? savingChanges : title}
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
