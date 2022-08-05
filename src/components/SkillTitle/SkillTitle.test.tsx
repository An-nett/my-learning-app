import {
  fireEvent,
  getByRole,
  getAllByRole,
  getByText,
  queryByTestId,
} from "@testing-library/react";
import { createRoot, Root } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import { SkillTitle } from "./SkillTitle";

let container: HTMLDivElement | null = null;
let root: Root | null = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container as HTMLDivElement);
});

afterEach(() => {
  document.body.removeChild(container as HTMLDivElement);
  container = null;
  root = null;
});

describe("Skill Title", () => {
  it("renders title and changes it on edit", () => {
    const firstTitle = "Skill Name";
    const changedTitle = "New Skill Name";

    act(() => {
      root?.render(
        <BrowserRouter>
          <SkillTitle />
        </BrowserRouter>
      );
    });

    getByText(container!, firstTitle);
    const buttons = getAllByRole(container!, "button");
    const editButton = buttons.find((button) =>
      queryByTestId(button, "EditIcon")
    );

    act(() => {
      fireEvent.click(editButton!);
    });

    const input = getByRole(container!, "textbox");

    act(() => {
      fireEvent.change(input, {
        target: { value: changedTitle },
      });
      fireEvent.click(editButton!);
    });

    getByText(container!, changedTitle);
  });
});
