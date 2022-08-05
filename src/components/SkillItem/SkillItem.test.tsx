import {
  fireEvent,
  getByRole,
  getAllByRole,
  getByTestId,
  getByText,
  queryByText,
} from "@testing-library/react";
import { createRoot, Root } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { SkillItem } from "./SkillItem";

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

describe("Skill Item", () => {
  const exTitle = "Ex";
  const exDate = "2022-08-08";

  it("formats date and shows when not done", () => {
    const date = "1998-09-23";
    const formattedDate = "23.09.1998";
    let item: HTMLElement | null = null;

    act(() => {
      root?.render(<SkillItem title={exTitle} datePlan={date} />);
    });
    item = getByText(container!, formattedDate);
    expect(item).toBeInTheDocument();

    act(() => {
      root?.render(<SkillItem title={exTitle} datePlan={date} isDone />);
    });
    item = queryByText(container!, formattedDate);
    expect(item).toBeNull();
  });

  it("renders right title or icon on button", () => {
    let done: HTMLElement | null = null;
    let notDone: HTMLElement | null = null;

    act(() => {
      root?.render(<SkillItem title={exTitle} datePlan={exDate} isDone />);
    });
    done = getByText(container!, "done");
    notDone = queryByText(container!, "not yet");
    expect(notDone).toBeNull();

    act(() => {
      fireEvent.mouseEnter(done!);
    });
    getByTestId(container!, "EditIcon");
    act(() => {
      fireEvent.mouseLeave(done!);
    });

    act(() => {
      root?.render(<SkillItem title={exTitle} datePlan={exDate} />);
    });
    done = queryByText(container!, "done");
    notDone = getByText(container!, "not yet");
    expect(done).toBeNull();

    act(() => {
      fireEvent.mouseEnter(notDone!);
    });
    getByTestId(container!, "EditIcon");
  });

  it("changes date and title input on edit", () => {
    act(() => {
      root?.render(<SkillItem title={exTitle} datePlan={exDate} />);
    });
    getByText(container as HTMLElement, exTitle);
    const button = getByRole(container!, "button");
    let titleInput: HTMLInputElement | null | undefined;
    let dateInput: HTMLInputElement | null | undefined;

    act(() => {
      fireEvent.click(button);
    });
    titleInput = container?.querySelector('input[type="text"]');
    expect(titleInput).toBeInTheDocument();
    dateInput = container?.querySelector('input[type="date"]');
    expect(dateInput).toBeInTheDocument();

    const newTitleValue = "New Example Step";
    const newDateValue = "2000-08-21";
    const buttonDone = getAllByRole(container!, "button")[0];
    act(() => {
      fireEvent.change(titleInput!, { target: { value: newTitleValue } });
      fireEvent.change(dateInput!, { target: { value: newDateValue } });
      fireEvent.click(buttonDone);
    });

    getByText(container!, newTitleValue);
    getByText(container!, "21.08.2000");
  });
});
