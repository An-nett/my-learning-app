import { getByRole } from "@testing-library/react";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";
import { Header } from "./Header";

let container: HTMLDivElement | null = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container!);
  container!.remove();
  container = null;
});

describe("Header", () => {
  it("renders app name", () => {
    act(() => {
      render(<Header />, container);
    });
    expect(container).toContainHTML("My Learning App");
  });
  it("has login button", () => {
    act(() => {
      render(<Header />, container);
    });
    const button = getByRole(container as HTMLElement, "button");
    expect(button).not.toBeFalsy();
    expect(button).toHaveTextContent("Login");
  });
});
