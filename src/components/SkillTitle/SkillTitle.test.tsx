import { fireEvent, queryByTestId } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { TimeVariants } from "../../types/types";
import { initialData, renderWithProviders } from "../../utils/test-utils";
import { DEFAULT_TITLE, SkillTitle } from "./SkillTitle";

const TEST_TIME = TimeVariants.now;
const TEST_ID = 3;

describe("Skill Title", () => {
  const { title, id, time } = initialData[TEST_TIME].find(
    (skill) => skill.id === TEST_ID
  )!;
  const baseProps = { title, id: String(id), time };

  it("renders default title in create mode", () => {
    const { getByPlaceholderText } = renderWithProviders(
      <MemoryRouter initialEntries={[`/${TEST_TIME}/${TEST_ID}`]}>
        <SkillTitle {...baseProps} title={undefined} />
      </MemoryRouter>
    );

    getByPlaceholderText(DEFAULT_TITLE);
  });

  it("renders right title and changes it on edit", () => {
    const changedTitle = "New Skill Name";
    const { getByRole, getByText, getAllByRole } = renderWithProviders(
      <MemoryRouter initialEntries={[`/${TEST_TIME}/${TEST_ID}`]}>
        <SkillTitle {...baseProps} />
      </MemoryRouter>
    );

    getByText(title!);
    const buttons = getAllByRole("button");
    const editButton = buttons.find((button) =>
      queryByTestId(button, "EditIcon")
    );

    act(() => {
      fireEvent.click(editButton!);
    });

    const input = getByRole("textbox");
    const doneButton = buttons.find((button) =>
      queryByTestId(button, "DoneIcon")
    );

    act(() => {
      fireEvent.change(input, {
        target: { value: changedTitle },
      });
      fireEvent.click(doneButton!);
    });

    getByText(changedTitle);
  });
});
