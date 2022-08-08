export enum URL {
  MAIN = "/",
  SKILLS = "/:time",
  SKILL = "/:time/:skillId",
}

export enum TimeVariants {
  past = "past",
  now = "now",
  future = "future",
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
  id: number;
  isDone?: boolean;
  title?: string;
  date?: string | number;
}

export interface SkillData {
  id: string | number;
  title?: string;
  date?: string | number;
  time: TimeVariants;
  priority?: PriorityTypes;
  steps: StepData[];
}
