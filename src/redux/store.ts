import {
  configureStore,
  PreloadedState,
  combineReducers,
} from "@reduxjs/toolkit";
import skills from "./slices/skills";

const rootReducer = combineReducers({
  skills: skills.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore["dispatch"];
