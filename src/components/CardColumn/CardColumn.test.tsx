import { Box } from "@mui/material";
import { JSXElementConstructor, ReactElement } from "react";
import { TimeTitles, TimeVariants } from "../../types/types";
import { renderWithProviders } from "../../utils/test-utils";
import { CardColumn } from "./CardColumn";

describe("Card Column", () => {
  it("renders name depending on time and children", () => {
    let rerender: (
      ui: ReactElement<any, string | JSXElementConstructor<any>>
    ) => void;
    let container: Element | null = null;

    Object.values(TimeVariants).forEach((value) => {
      if (rerender) {
        rerender(
          <CardColumn time={value}>
            <Box id="example" />
          </CardColumn>
        );
      } else {
        ({ rerender, container } = renderWithProviders(
          <CardColumn time={value}>
            <Box id="example" />
          </CardColumn>
        ));
      }
      expect(container).toContainHTML(TimeTitles[value]);
    });

    const el = document.getElementById("example");
    expect(container).toContainElement(el);
  });
});
