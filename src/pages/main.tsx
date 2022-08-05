import { Grid } from "@mui/material";
import { FC } from "react";
import { CardMainPage } from "../components/Card/Card";
import { CardColumn } from "../components/CardColumn/CardColumn";
import { PriorityTypes, TimeVariants } from "../types/types";

export const MainPage: FC = () => {
  return (
    <Grid container spacing={3} justifyContent="center">
      <CardColumn time={TimeVariants.past}>
        <CardMainPage
          title="Example Title"
          time={TimeVariants.past}
          date={Date.now()}
          priority={PriorityTypes.high}
        />
        <CardMainPage
          title="Example Title"
          time={TimeVariants.past}
          date={Date.now()}
          priority={PriorityTypes.medium}
        />
        <CardMainPage
          title="Example Title"
          time={TimeVariants.past}
          date={Date.now()}
          priority={PriorityTypes.medium}
        />
        <CardMainPage
          title="Example Title"
          time={TimeVariants.past}
          date={Date.now()}
          priority={PriorityTypes.medium}
        />
      </CardColumn>
      <CardColumn time={TimeVariants.now}>
        <CardMainPage
          title="Example Title"
          time={TimeVariants.now}
          date={Date.now()}
          priority={PriorityTypes.low}
        />
      </CardColumn>
      <CardColumn time={TimeVariants.future}></CardColumn>
    </Grid>
  );
};
