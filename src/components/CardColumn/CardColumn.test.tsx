import { Box } from "@mui/material";
import ReactDOM, { createRoot, Root } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { TimeTitles, TimeVariants } from "../../types/types";
import { CardColumn } from "./CardColumn";

let container: HTMLDivElement | null = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container as HTMLDivElement);
  container = null;
});

describe("Card Column", () => {
  it("renders name depending on time and children", () => {
    const root = createRoot(container as HTMLDivElement);

    Object.values(TimeVariants).forEach((value) => {
      if (typeof value === "string") return;
      act(() => {
        root.render(
          <CardColumn time={value}>
            <Box id="example" />
          </CardColumn>
        );
      });
      expect(container).toContainHTML(TimeTitles[value]);
    });

    const el = document.getElementById("example");
    expect(container).toContainElement(el);
  });
});
