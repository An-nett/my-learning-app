import { TimeVariants, URL } from "../types/types";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { initialData, renderWithProviders } from "../utils/test-utils";
import { SkillPage } from "./skill";
import {
  fireEvent,
  getAllByRole,
  queryByTestId,
  waitFor,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";

const TEST_TIME = TimeVariants.now;
const TEST_ID = 3;

describe("Skill item page", () => {
  const skillToRender = initialData[TEST_TIME].find(
    (skill) => skill.id === TEST_ID
  )!;

  it("renders right data", async () => {
    const { findByText, getAllByRole } = renderWithProviders(
      <MemoryRouter initialEntries={[`/${TEST_TIME}/${TEST_ID}`]}>
        <Routes>
          <Route path={URL.SKILL} element={<SkillPage />} />
        </Routes>
      </MemoryRouter>
    );

    await findByText(skillToRender.title!);

    expect(getAllByRole("listitem")).toHaveLength(skillToRender.steps.length);
  });

  it("deletes steps", async () => {
    const { findByRole } = renderWithProviders(
      <MemoryRouter initialEntries={[`/${TEST_TIME}/${TEST_ID}`]}>
        <Routes>
          <Route path={URL.SKILL} element={<SkillPage />} />
        </Routes>
      </MemoryRouter>
    );

    const list = await findByRole("list");
    const deleteButton = getAllByRole(list, "button").find((button) =>
      queryByTestId(button, "DeleteIcon")
    );

    act(() => {
      fireEvent.click(deleteButton!);
    });

    await waitFor(() =>
      expect(getAllByRole(list, "listitem")).toHaveLength(
        skillToRender.steps.length - 1
      )
    );
  });

  it("deletes skill and goes to main page", async () => {
    const { findAllByRole, getByText } = renderWithProviders(
      <MemoryRouter initialEntries={[`/${TEST_TIME}/${TEST_ID}`]}>
        <Routes>
          <Route path={URL.SKILL} element={<SkillPage />} />
          <Route path={URL.MAIN} element={<p>Main page</p>} />
        </Routes>
      </MemoryRouter>
    );

    const buttons = await findAllByRole("button");
    const deleteSkillButton = buttons.find((button) =>
      queryByTestId(button, "DeleteIcon")
    );
    act(() => {
      fireEvent.click(deleteSkillButton!);
    });

    await waitFor(() => getByText(/Main page/i));
  });
});
