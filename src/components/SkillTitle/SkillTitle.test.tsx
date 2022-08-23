import {
  fireEvent,
  queryByTestId,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { PriorityTypes, TimeVariants } from "../../types/types";
import { initialData, renderWithProviders } from "../../utils/test-utils";
import { SkillTitle } from "./SkillTitle";
import { DEFAULT_TITLE } from "../../utils/text";

const TEST_TIME = TimeVariants.now;
const TEST_ID = 3;

const skill = initialData[TEST_TIME].find((skill) => skill.id === TEST_ID)!;

const CHANGED_TITLE = "New Skill Name";

export const handlers = [
  rest.patch(
    "https://learning-app-c4963-default-rtdb.firebaseio.com/skills/:time/:skillId.json",
    async (req, res, ctx) => {
      const body = await req.json();
      return res(ctx.json(body), ctx.delay(200));
    }
  ),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Skill Title", () => {
  const { title, id } = skill;
  const baseProps = {
    title,
    id: String(id),
    time: TEST_TIME,
    priority: PriorityTypes.low,
  };

  it("renders default title in create mode", () => {
    const { getByPlaceholderText } = renderWithProviders(
      <MemoryRouter initialEntries={[`/${TEST_TIME}/${TEST_ID}`]}>
        <SkillTitle {...baseProps} title={undefined} />
      </MemoryRouter>
    );

    getByPlaceholderText(DEFAULT_TITLE);
  });

  it("renders right title and changes it on edit", async () => {
    const { getByRole, getByText, getAllByRole, findByText, findByRole } =
      renderWithProviders(
        <MemoryRouter initialEntries={[`/${TEST_TIME}/${TEST_ID}`]}>
          <SkillTitle {...baseProps} />
        </MemoryRouter>
      );

    getByText(title!);
    let buttons = getAllByRole("button");
    const editButton = buttons.find((button) =>
      queryByTestId(button, "EditIcon")
    );

    act(() => {
      fireEvent.click(editButton!);
    });

    const input = getByRole("textbox");

    buttons = getAllByRole("button");
    const doneButton = buttons.find((button) =>
      queryByTestId(button, "DoneIcon")
    );
    const priorityButton = buttons.find((button) =>
      queryByTestId(button, "KeyboardDoubleArrowDownIcon")
    );

    act(() => {
      fireEvent.change(input, {
        target: { value: CHANGED_TITLE },
      });
      fireEvent.click(priorityButton!);
      fireEvent.click(doneButton!);
    });

    waitForElementToBeRemoved(() => findByRole("progressbar")).then(() =>
      getByText(CHANGED_TITLE)
    );
  });
});
