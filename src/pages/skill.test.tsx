import { TimeVariants } from "../types/types";
import { MemoryRouter } from "react-router-dom";
import { initialData, renderWithProviders } from "../utils/test-utils";
import { SkillPage } from "./skill";

const TEST_TIME = TimeVariants.now;
const TEST_ID = 3;

describe("Skill item page", () => {
  const skillToRender = initialData[TEST_TIME].find(
    (skill) => skill.id === TEST_ID
  )!;

  it("renders right data", () => {
    const { findByText, findAllByRole } = renderWithProviders(
      <MemoryRouter initialEntries={[`/${TEST_TIME}/${TEST_ID}`]}>
        <SkillPage />
      </MemoryRouter>
    );
    findByText(skillToRender.title);

    findAllByRole("listitem").then((res) => {
      expect(res).toHaveLength(skillToRender.steps.length);
    });
  });
});
