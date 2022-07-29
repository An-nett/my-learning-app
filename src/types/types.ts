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

export const PriorityTypesTitles: Record<PriorityTypes, string> = {
  [PriorityTypes.low]: "Low",
  [PriorityTypes.medium]: "Medium",
  [PriorityTypes.high]: "High",
};
