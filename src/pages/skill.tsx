import { Edit } from "@mui/icons-material";
import { alpha, Button, Stack, TextField, Typography } from "@mui/material";
import { FC, useCallback, useState } from "react";
import { ActionButton } from "../components/Buttons/Buttons.styled";
import { SkillItem } from "../components/SkillItem/SkillItem";

export const SkillPage: FC = () => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("Skill Name");

  const toggleEditMode = useCallback(() => {
    setEditMode((prevMode) => !prevMode);
  }, []);
  const handleTitleChange = useCallback((e: React.BaseSyntheticEvent) => {
    setTitle(e.target.value);
  }, []);

  return (
    <Stack spacing={2}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        px={3}
        py={2}
        sx={(theme) => ({
          backgroundColor: alpha(theme.palette.secondary.light, 0.5),
          borderRadius: theme.spacing(1),
        })}
      >
        {editMode ? (
          <TextField
            autoFocus
            value={title}
            onChange={handleTitleChange}
            variant="standard"
            size="small"
            color="secondary"
          />
        ) : (
          <Typography variant="overline">{title}</Typography>
        )}
        <ActionButton onClick={toggleEditMode}>
          <Edit />
        </ActionButton>
      </Stack>
      <Stack
        spacing={3}
        p={3}
        sx={(theme) => ({
          border: `2px solid ${theme.palette.info.light}`,
          borderRadius: theme.spacing(1),
        })}
      >
        <SkillItem title="Example step 1" datePlan="2022-05-06" isDone />
        <SkillItem title="Example step 2" datePlan="2022-07-22" />
        <SkillItem title="Example step 3" datePlan="2022-08-22" />
      </Stack>
      <Button
        variant="outlined"
        color="secondary"
        size="large"
        sx={{ alignSelf: "center" }}
      >
        Add new step
      </Button>
    </Stack>
  );
};
