import { fireEvent } from "@testing-library/react";
import moment from "moment";
import { rest } from "msw";
import { setupServer } from "msw/lib/node";
import { act } from "react-dom/test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { mainDate } from "../../types/date-format";
import { TimeVariants, URL } from "../../types/types";
import { initialData, renderWithProviders } from "../../utils/test-utils";
import { StepItem } from "./StepItem";

const TEST_TIME = TimeVariants.now;
const TEST_ID = 3;

const CHANGED_STEP_TITLE = "New Example Step";
const CHANGED_STEP_DATE = "2000-08-21";

const getExProps = (id: number) =>
  initialData[TEST_TIME].find((skill) => skill.id === TEST_ID)?.steps?.find(
    (step) => step.id === id
  )!;

export const handlers = [
  rest.patch(`skills/${TEST_TIME}/${TEST_ID}.json`, (req, res, ctx) =>
    res(
      ctx.json({
        steps: [
          {
            id: 3.2,
            title: CHANGED_STEP_TITLE,
            date: CHANGED_STEP_DATE,
            isDone: true,
          },
        ],
      }),
      ctx.delay(200)
    )
  ),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Step Item", () => {
  it("formats date and shows when not done", () => {
    let item: HTMLElement | null = null;

    const { getByText, queryByText, rerender } = renderWithProviders(
      <MemoryRouter initialEntries={[`/${TEST_TIME}/${TEST_ID}`]}>
        <Routes>
          <Route path={URL.SKILL} element={<StepItem {...getExProps(3.2)} />} />
        </Routes>
      </MemoryRouter>
    );
    item = getByText(moment(getExProps(3.2).date).format(mainDate));

    rerender(<StepItem {...getExProps(3.1)} />);
    item = queryByText(moment(getExProps(3.1).date).format(mainDate));
    expect(item).toBeNull();
  });

  it("renders right title or icon on button", () => {
    let done: HTMLElement | null = null;
    let notDone: HTMLElement | null = null;

    let { getByText, queryByText, getByTestId, rerender } = renderWithProviders(
      <MemoryRouter initialEntries={[`/${TEST_TIME}/${TEST_ID}`]}>
        <Routes>
          <Route path={URL.SKILL} element={<StepItem {...getExProps(3.1)} />} />
        </Routes>
      </MemoryRouter>
    );
    done = getByText(/done/i);
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
    done = queryByText(/done/i);
    notDone = getByText(/not yet/i);
    expect(done).toBeNull();

    act(() => {
      fireEvent.mouseEnter(notDone!);
    });
    getByTestId("EditIcon");
  });

  it("changes date and title input on edit", async () => {
    let { getByText, getAllByRole, findByRole, findByText, container } =
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
    getByText(getExProps(3.2).title!);

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

    await findByRole("progressbar");

    await findByText(CHANGED_STEP_TITLE);
    await findByText(moment(CHANGED_STEP_DATE).format(mainDate));
  });
});
