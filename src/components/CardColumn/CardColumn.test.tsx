import { Box } from "@mui/material";
import { fireEvent } from "@testing-library/react";
import { JSXElementConstructor, ReactElement } from "react";
import { act } from "react-dom/test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { TimeTitles, TimeVariants, URL } from "../../types/types";
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
          <MemoryRouter initialEntries={[URL.MAIN]}>
            <Routes>
              <Route
                path={URL.MAIN}
                element={
                  <CardColumn time={value}>
                    <Box id="example" />
                  </CardColumn>
                }
              />
            </Routes>
          </MemoryRouter>
        );
      } else {
        ({ rerender, container } = renderWithProviders(
          <MemoryRouter initialEntries={[URL.MAIN]}>
            <Routes>
              <Route
                path={URL.MAIN}
                element={
                  <CardColumn time={value}>
                    <Box id="example" />
                  </CardColumn>
                }
              />
            </Routes>
          </MemoryRouter>
        ));
      }
      expect(container).toContainHTML(TimeTitles[value]);
    });

    const el = document.getElementById("example");
    expect(container).toContainElement(el);
  });

  it("redirects to skill page when adding new skill", () => {
    const { queryByRole, getByRole, getByText, container } =
      renderWithProviders(
        <MemoryRouter initialEntries={[URL.MAIN]}>
          <Routes>
            <Route
              path={URL.MAIN}
              element={
                <CardColumn time={TimeVariants.now}>
                  <Box id="example" />
                </CardColumn>
              }
            />
            <Route path={URL.SKILL} element={<p>New skill</p>} />
          </Routes>
        </MemoryRouter>
      );

    let addButton = queryByRole("button");
    expect(addButton).toBeNull();

    act(() => {
      fireEvent.mouseEnter(container.querySelector(".MuiGrid-item")!);
    });

    addButton = getByRole("button");
    act(() => {
      fireEvent.click(addButton!);
    });

    getByText(/New skill/i);
  });
});
