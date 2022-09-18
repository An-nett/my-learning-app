import {
  configureStore,
  PreloadedState,
  combineReducers,
} from "@reduxjs/toolkit";
import { skillsApi } from "../services/skills";
import auth from "./slices/auth";
import skills from "./slices/skills";

const rootReducer = combineReducers({
  skills: skills.reducer,
  auth: auth.reducer,
  [skillsApi.reducerPath]: skillsApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(skillsApi.middleware),
    preloadedState,
  });

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore["dispatch"];
