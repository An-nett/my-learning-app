import { configureStore } from "@reduxjs/toolkit";
import skills from "./slices/skills";

export const store = configureStore({
  reducer: {
    skills: skills.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
