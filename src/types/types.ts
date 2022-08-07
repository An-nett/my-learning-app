export enum URL {
  MAIN = "/",
  SKILLS = "/skill",
  SKILL = "/skill/:skillId",
}

export enum TimeVariants {
  past,
  now,
  future,
}

export const TimeTitles: Record<TimeVariants, string> = {
  [TimeVariants.past]: "Done",
  [TimeVariants.now]: "In process",
  [TimeVariants.future]: "Plan",
};

export enum PriorityTypes {
  low,
  medium,
  high,
}

export interface StepData {
  isDone: boolean;
}

export interface SkillData {
  id: string | number;
  title: string;
  date: string | number;
  time: TimeVariants;
  priority: PriorityTypes;
  steps: StepData[];
}
