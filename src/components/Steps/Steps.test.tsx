import { fireEvent, queryByTestId } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/lib/node";
import { act } from "react-dom/test-utils";
import { TimeVariants } from "../../types/types";
import { initialData, renderWithProviders } from "../../utils/test-utils";
import { Steps } from "./Steps";

const TEST_TIME = TimeVariants.now;
const TEST_ID = 3;

const steps = initialData[TEST_TIME].find((skill) => skill.id === TEST_ID)
  ?.steps!;

// TODO ДОбавить условное возвращение
export const handlers = [
  rest.get(
    "https://learning-app-c4963-default-rtdb.firebaseio.com/skills/:time/:skillId/steps.json",
    (req, res, ctx) => res(ctx.json(steps), ctx.delay(200))
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

describe("Steps", () => {
  it("sends request to add step", async () => {
    const { getByText, findByRole, findAllByRole } = renderWithProviders(
      <Steps id={String(TEST_ID)} time={TEST_TIME} />
    );

    let items = await findAllByRole("listitem");

    expect(items).toHaveLength(steps.length);

    const button = getByText(/Add new step/i);
    act(() => {
      fireEvent.click(button);
    });

    await findByRole("progressbar");
  });
});
