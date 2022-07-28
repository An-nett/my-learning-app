import { getByRole } from "@testing-library/react";
import ReactDOM, { Root } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { Header } from "./Header";

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

describe("Header", () => {
  it("renders app name", () => {
    act(() => {
      root!.render(<Header />);
    });
    expect(container).toContainHTML("My Learning App");
  });
  it("has login button", () => {
    act(() => {
      root!.render(<Header />);
    });
    const button = getByRole(container as HTMLElement, "button");
    expect(button).not.toBeFalsy();
    expect(button).toHaveTextContent("Login");
  });
});
