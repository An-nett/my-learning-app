import { Grid } from "@mui/material";
import { FC } from "react";
import { CardMainPage } from "../components/Card/Card";
import { CardColumn } from "../components/CardColumn/CardColumn";
import { useAppSelector } from "../redux/hooks";
import { TimeVariants } from "../types/types";

export const MainPage: FC = () => {
  const skills = useAppSelector((state) => state.skills);

  return (
    <Grid container spacing={3} justifyContent="center">
      {Object.values(TimeVariants).map((val) => {
        if (typeof val === "string") return null;

        return (
          <CardColumn time={val}>
            {skills[val].map((skill) => (
              <CardMainPage
                id={skill.id}
                title={skill.title}
                time={skill.time}
                date={skill.date}
                priority={skill.priority}
                steps={skill.steps}
              />
            ))}
          </CardColumn>
        );
      })}
    </Grid>
  );
};
