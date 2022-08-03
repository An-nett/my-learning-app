import { Grid, Stack } from "@mui/material";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { TimeTitles } from "../../types/types";
import {
  BackgroundTrackStyled,
  CardTrackStyled,
  CardTrackStyledProps,
  ColumnTitleStyled,
  TMaskType,
} from "./CardColumn.styled";

interface CardColumnProps
  extends CardTrackStyledProps,
    React.PropsWithChildren {}

export const CardColumn: FC<CardColumnProps> = ({ time, children }) => {
  const [maskType, setMaskType] = useState<TMaskType>();
  const ref = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (ref.current) {
      const {
        offsetHeight,
        offsetWidth,
        scrollHeight,
        scrollWidth,
        scrollLeft,
        scrollTop,
      } = ref.current;

      const isVertical = scrollHeight > offsetHeight;
      const [scrollValue, size, fullScrollSize] = isVertical
        ? [Math.ceil(scrollTop), offsetHeight, scrollHeight]
        : [Math.ceil(scrollLeft), offsetWidth, scrollWidth];

      if (scrollValue > 0 && scrollValue + size < fullScrollSize) {
        setMaskType(isVertical ? "y" : "x");
      } else if (scrollValue > 0) {
        setMaskType(isVertical ? "top" : "left");
      } else if (scrollValue + size < fullScrollSize) {
        setMaskType(isVertical ? "bottom" : "right");
      } else {
        setMaskType(undefined);
      }
    }
  }, []);

  useEffect(() => {
    handleScroll();

    const curRef = ref.current;
    curRef?.addEventListener("scroll", handleScroll);

    return () => {
      curRef?.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Stack sx={{ height: "100%", position: "relative" }}>
        <ColumnTitleStyled time={time} variant="h2">
          {TimeTitles[time]}
        </ColumnTitleStyled>
        <BackgroundTrackStyled time={time}>
          <CardTrackStyled
            time={time}
            maskType={maskType}
            spacing={2}
            ref={ref}
            direction={{ xs: "row", sm: "column" }}
            overflow="scroll"
          >
            {children}
          </CardTrackStyled>
        </BackgroundTrackStyled>
      </Stack>
    </Grid>
  );
};
