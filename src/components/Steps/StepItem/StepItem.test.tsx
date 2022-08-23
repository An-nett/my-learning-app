import { fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import moment from "moment";
import { rest } from "msw";
import { setupServer } from "msw/lib/node";
import { act } from "react-dom/test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { mainDate } from "../../../types/date-format";
import { TimeVariants, URL } from "../../../types/types";
import { initialData, renderWithProviders } from "../../../utils/test-utils";
import { SAVING_CHANGES } from "../../../utils/text";
import { StepItem } from "./StepItem";

const TEST_TIME = TimeVariants.now;
const TEST_ID = 3;

const CHANGED_STEP_TITLE = "New Example Step";
const CHANGED_STEP_DATE = "2000-08-21";

const steps = initialData[TEST_TIME].find((skill) => skill.id === TEST_ID)
  ?.steps!;

const getExProps = (id: number) => steps?.find((step) => step.id === id)!;

export const handlers = [
  rest.get(
    "https://learning-app-c4963-default-rtdb.firebaseio.com/skills/:time/:skillId/steps.json",
    (req, res, ctx) =>
      res(ctx.json([getExProps(3.2), getExProps(3.1)]), ctx.delay(200))
  ),
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

describe("Step Item", () => {
  it("formats date and shows when not done", async () => {
    let item: HTMLElement | null = null;

    const { findByText, queryByText, rerender } = renderWithProviders(
      <MemoryRouter initialEntries={[`/${TEST_TIME}/${TEST_ID}`]}>
        <Routes>
          <Route path={URL.SKILL} element={<StepItem {...getExProps(3.2)} />} />
        </Routes>
      </MemoryRouter>
    );
    item = await findByText(moment(getExProps(3.2).date).format(mainDate));

    rerender(<StepItem {...getExProps(3.1)} />);
    await findByText(getExProps(3.1).title!);

    item = queryByText(moment(getExProps(3.1).date).format(mainDate));
    expect(item).toBeNull();
  });

  it("renders right title or icon on button", async () => {
    let done: HTMLElement | null = null;
    let notDone: HTMLElement | null = null;

    let { findByText, queryByText, getByTestId, rerender } =
      renderWithProviders(
        <MemoryRouter initialEntries={[`/${TEST_TIME}/${TEST_ID}`]}>
          <Routes>
            <Route
              path={URL.SKILL}
              element={<StepItem {...getExProps(3.1)} />}
            />
          </Routes>
        </MemoryRouter>
      );
    done = await findByText(/done/i);

    notDone = queryByText(/not yet/i);
    expect(notDone).toBeNull();

    act(() => {
      fireEvent.mouseEnter(done!);
    });
    getByTestId("EditIcon");
    act(() => {
      fireEvent.mouseLeave(done!);
    });

    rerender(<StepItem {...getExProps(3.2)} />);
    notDone = await findByText(/not yet/i);

    done = queryByText(/done/i);
    expect(done).toBeNull();

    act(() => {
      fireEvent.mouseEnter(notDone!);
    });
    getByTestId("EditIcon");
  });

  it("changes date and title input on edit", async () => {
    let { getByText, getAllByRole, findByText, container } =
      renderWithProviders(
        <MemoryRouter initialEntries={[`/${TEST_TIME}/${TEST_ID}`]}>
          <Routes>
            <Route
              path={URL.SKILL}
              element={<StepItem {...getExProps(3.2)} />}
            />
          </Routes>
        </MemoryRouter>
      );
    await findByText(getExProps(3.2).title!);

    const button = getAllByRole("button")[0];
    let titleInput: Element | null | undefined;
    let dateInput: Element | null | undefined;

    act(() => {
      fireEvent.click(button);
    });
    titleInput = container?.querySelector('input[type="text"]');
    expect(titleInput).toBeInTheDocument();
    dateInput = container?.querySelector('input[type="date"]');
    expect(dateInput).toBeInTheDocument();

    const buttonDone = getAllByRole("button")[0];
    act(() => {
      fireEvent.change(titleInput!, { target: { value: CHANGED_STEP_TITLE } });
      fireEvent.change(dateInput!, { target: { value: CHANGED_STEP_DATE } });
      fireEvent.click(buttonDone);
    });

    waitForElementToBeRemoved(() => findByText(SAVING_CHANGES)).then(() => {
      getByText(CHANGED_STEP_TITLE);
      getByText(moment(CHANGED_STEP_DATE).format(mainDate));
    });
  });
});
