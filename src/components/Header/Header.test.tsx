import { getByRole } from "@testing-library/react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { Header } from "./Header";

let container: HTMLDivElement | null = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container as HTMLDivElement);
  container = null;
});

describe("Header", () => {
  it("renders app name and login button", () => {
    act(() => {
      createRoot(container as HTMLDivElement).render(<Header />);
    });

    expect(container).toContainHTML("My Learning App");

    const button = getByRole(container as HTMLElement, "button");
    expect(button).not.toBeFalsy();
    expect(button).toHaveTextContent("Login");
  });
});
