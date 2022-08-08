import { render, RenderOptions } from "@testing-library/react";
import { PreloadedState } from "@reduxjs/toolkit";
import { AppStore, RootState, setupStore } from "../redux/store";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { PriorityTypes, SkillData, TimeVariants } from "../types/types";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export const initialData: Record<TimeVariants, SkillData[]> = {
  [TimeVariants.past]: [],
  [TimeVariants.now]: [
    {
      id: 3,
      title: "Example Skill 3",
      date: Date.now(),
      priority: PriorityTypes.medium,
      time: TimeVariants.now,
      steps: [
        { id: 3.1, title: "Example step 1", date: "2022-07-03", isDone: true },
        { id: 3.2, title: "Example step 2", date: "2022-08-06", isDone: false },
        { id: 3.3, title: "Example step 3", date: "2022-08-26", isDone: false },
      ],
    },
  ],
  [TimeVariants.future]: [],
};

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = { skills: initialData },
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
