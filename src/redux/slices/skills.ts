import { createSlice } from "@reduxjs/toolkit";
import { PriorityTypes, SkillData, TimeVariants } from "../../types/types";

const DUMMY_SKILLS: Record<TimeVariants, SkillData[]> = {
  [TimeVariants.past]: [
    {
      id: 1,
      title: "Example Skill 1",
      date: "2022-08-05",
      priority: PriorityTypes.high,
      time: TimeVariants.past,
      steps: [],
    },
    {
      id: 2,
      title: "Example Skill 2",
      date: "2022-06-15",
      priority: PriorityTypes.low,
      time: TimeVariants.past,
      steps: [],
    },
  ],
  [TimeVariants.now]: [
    {
      id: 3,
      title: "Example Skill 3",
      date: Date.now(),
      priority: PriorityTypes.medium,
      time: TimeVariants.now,
      steps: [{ isDone: true }, { isDone: false }, { isDone: false }],
    },
  ],
  [TimeVariants.future]: [],
};

const initialState = DUMMY_SKILLS;

export const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {},
});

export const actions = skillsSlice.actions;
export default skillsSlice;
