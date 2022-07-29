import { getByText } from "@testing-library/react";
import { createRoot, Root } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { PriorityTypes, TimeVariants } from "../../types/types";
import { CardMainPage } from "./Card";

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

describe("Card", () => {
  const baseProps = {
    title: "Example",
    date: Date.now(),
    priority: PriorityTypes.high,
    time: TimeVariants.past,
  };

  it("renders card with given title", () => {
    act(() => {
      root?.render(<CardMainPage {...baseProps} />);
    });
    let card = getByText(container as HTMLElement, "Example");
    expect(card).toBeInTheDocument();

    act(() => {
      root?.render(<CardMainPage {...baseProps} title="Another Example" />);
    });
    card = getByText(container as HTMLElement, "Another Example");
    expect(card).toBeInTheDocument();
  });

  it("renders progress bar on process tasks", () => {
    act(() => {
      root?.render(<CardMainPage {...baseProps} />);
    });
    let progressBar = document.getElementsByClassName("progress");
    expect(progressBar).toHaveLength(0);

    act(() => {
      root?.render(<CardMainPage {...baseProps} time={TimeVariants.now} />);
    });
    progressBar = document.getElementsByClassName("progress");
    expect(progressBar).not.toHaveLength(0);
  });
});
