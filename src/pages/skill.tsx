import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { SkillTitle } from "../components/SkillTitle/SkillTitle";
import { useParams } from "react-router-dom";
import { TimeVariants, URL } from "../types/types";
import { useGetSkillQuery } from "../services/skills";
import { Steps } from "../components/Steps/Steps";

export const SkillPage: FC = () => {
  const { time, skillId: id } = useParams() as {
    time: TimeVariants;
    skillId: string;
  };
  const navigate = useNavigate();

  const { data: skillData, isLoading } = useGetSkillQuery({ id, time });

  const { title, priority = 0 } = skillData ?? {};

  if (isLoading) {
    return (
      <Stack alignItems="center" pt={8}>
        <CircularProgress size={40} />
      </Stack>
    );
  }

  if (!id)
    return (
      <Stack spacing={10}>
        <Typography variant="h1" component="p" textAlign="center">
          Sorry, the skill with given id was not found...
        </Typography>
        <Button
          variant="outlined"
          color="info"
          size="large"
          sx={{ alignSelf: "center" }}
          onClick={() => navigate(URL.MAIN)}
        >
          Go to main page
        </Button>
      </Stack>
    );

  return (
    <Stack spacing={2}>
      <SkillTitle {...{ time, id, title, priority }} />
      <Steps id={id} time={time} />
    </Stack>
  );
};
