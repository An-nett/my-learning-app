import { Box } from "@mui/material";
import {
  fireEvent,
  getByRole,
  getByTestId,
  getByText,
  queryByText,
} from "@testing-library/react";
import ReactDOM, { createRoot, Root } from "react-dom/client";
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

  it("renders title", () => {
    act(() => {
      root?.render(<SkillItem title={exTitle} datePlan={exDate} />);
    });
    const item = getByText(container as HTMLElement, exTitle);
    expect(item).toBeInTheDocument();
  });
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

  it("renders right title on button", () => {
    let done: HTMLElement | null = null;
    let notDone: HTMLElement | null = null;

    act(() => {
      root?.render(<SkillItem title={exTitle} datePlan={exDate} isDone />);
    });
    done = queryByText(container!, "done");
    notDone = queryByText(container!, "not yet");
    expect(done).toBeInTheDocument();
    expect(notDone).toBeNull();

    act(() => {
      root?.render(<SkillItem title={exTitle} datePlan={exDate} />);
    });
    done = queryByText(container!, "done");
    notDone = queryByText(container!, "not yet");
    expect(done).toBeNull();
    expect(notDone).toBeInTheDocument();
  });

  it("renders edit button on hover", () => {
    act(() => {
      root?.render(<SkillItem title={exTitle} datePlan={exDate} />);
    });
    const button = getByRole(container!, "button");

    act(() => {
      fireEvent.mouseEnter(button);
    });
    const editButton = getByTestId(container!, "EditIcon");
    expect(editButton).toBeInTheDocument();
  });
});
