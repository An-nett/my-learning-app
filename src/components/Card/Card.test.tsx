import { Card } from "@mui/material";
import ReactDOM, { Root } from "react-dom/client";
import { act } from "react-dom/test-utils";

let container: HTMLDivElement | null = null;
let root: Root | null = null;

beforeEach(() => {
  container = document.createElement("div");
  root = ReactDOM.createRoot(container);
});

afterEach(() => {
  root?.unmount();
  container!.remove();
  container = null;
});

describe("Card", () => {
  it("renders card with given title", () => {
    act(() => {
      root!.render(<Card title="Example" />);
    });
    expect(container).toContainHTML("Example");

    act(() => {
      root!.render(<Card title="Another Example" />);
    });
    expect(container).toContainHTML("Another Example");
  });
});
