import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
      steps: [
        { id: 3.1, title: "Example step 1", date: "2022-07-03", isDone: true },
        { id: 3.2, title: "Example step 2", date: "2022-08-06", isDone: false },
        { id: 3.3, title: "Example step 3", date: "2022-08-26", isDone: false },
      ],
    },
  ],
  [TimeVariants.future]: [],
};

const initialState = DUMMY_SKILLS;

interface SkillActionProps {
  time: TimeVariants;
  id: number;
}

export const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    removeSkill: (state, action: PayloadAction<SkillActionProps>) => {
      const { time, id } = action.payload;
      state[time] = state[time].filter((skill) => skill.id !== id);
    },
    addStep: (state, action: PayloadAction<SkillActionProps>) => {
      const { time, id } = action.payload;
      const skill = state[time].find((it) => it.id === id);
      skill?.steps.push({
        id: id + Math.random(),
      });
    },
    removeStep: (
      state,
      action: PayloadAction<SkillActionProps & { stepId: number }>
    ) => {
      const { time, id, stepId } = action.payload;
      const skill = state[time].find((it) => it.id === id);
      if (skill?.steps) {
        skill.steps = skill.steps.filter((step) => step.id !== stepId);
      }
    },
  },
});

export const actions = skillsSlice.actions;
export default skillsSlice;
