import { getByText } from "@testing-library/react";
import { createRoot, Root } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
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
    id: 1,
    title: "Example",
    date: Date.now(),
    priority: PriorityTypes.high,
    time: TimeVariants.past,
    steps: [],
  };

  it("renders card with given title", () => {
    act(() => {
      root?.render(
        <BrowserRouter>
          <CardMainPage {...baseProps} />
        </BrowserRouter>
      );
    });
    let card = getByText(container as HTMLElement, "Example");

    act(() => {
      root?.render(
        <BrowserRouter>
          <CardMainPage {...baseProps} title="Another Example" />
        </BrowserRouter>
      );
    });
    card = getByText(container as HTMLElement, "Another Example");
  });

  it("renders progress bar on process tasks", () => {
    act(() => {
      root?.render(
        <BrowserRouter>
          <CardMainPage {...baseProps} />
        </BrowserRouter>
      );
    });
    let progressBar = document.getElementsByClassName("progress");
    expect(progressBar).toHaveLength(0);

    act(() => {
      root?.render(
        <BrowserRouter>
          <CardMainPage {...baseProps} time={TimeVariants.now} />
        </BrowserRouter>
      );
    });
    progressBar = document.getElementsByClassName("progress");
    expect(progressBar).not.toHaveLength(0);
  });
});
