import { Grid } from "@mui/material";
import { FC } from "react";
import { TimeTitles } from "../../types/types";
import {
  CardTrackStyled,
  CardTrackStyledProps,
  ColumnTitleStyled,
} from "./CardColumn.styled";

interface CardColumnProps
  extends CardTrackStyledProps,
    React.PropsWithChildren {}

export const CardColumn: FC<CardColumnProps> = ({ time, children }) => {
  return (
    <Grid item xs={1}>
      <ColumnTitleStyled time={time} variant="h2">
        {TimeTitles[time]}
      </ColumnTitleStyled>
      <CardTrackStyled time={time} spacing={2}>
        {children}
      </CardTrackStyled>
    </Grid>
  );
};
