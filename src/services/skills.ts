import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SkillData, StepData, TimeVariants } from "../types/types";

type ResponseSkillData = Partial<
  Record<TimeVariants, Record<string, Omit<SkillData, "id">>>
>;
type MappedSkillData = Partial<Record<TimeVariants, SkillData[]>>;

interface BaseApiProps {
  time: TimeVariants;
  id: string;
}

export const skillsApi = createApi({
  reducerPath: "skillsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://learning-app-c4963-default-rtdb.firebaseio.com/",
  }),
  tagTypes: ["skills"],
  endpoints: (builder) => ({
    getSkills: builder.query<MappedSkillData, void>({
      query: () => ({ url: "skills.json" }),
      transformResponse: (response: ResponseSkillData) => {
        const newData: MappedSkillData = {};
        Object.keys(response ?? {}).forEach((key) => {
          newData[key as TimeVariants] = Object.entries(
            response[key as TimeVariants]!
          ).reduce(
            (acc, [key, val]) => [
              ...acc,
              { ...val, id: key.match(/[0-9]+/)?.[0] ?? 0 },
            ],
            [] as SkillData[]
          );
        });
        return newData;
      },
      providesTags: (response) => {
        const resIds = response
          ? Object.values(response ?? {}).reduce(
              (acc, val) => [...acc, ...val.map((v) => +v.id)],
              [] as number[]
            )
          : [];
        return [
          { type: "skills", id: "list" },
          ...resIds.map((id) => ({ type: "skills" as const, id })),
        ];
      },
    }),
    getSkill: builder.query<SkillData, BaseApiProps>({
      query: ({ id, time }) => ({ url: `skills/${time}/${id}.json` }),
      providesTags: (res, err, body) =>
        body?.id ? [{ type: "skills", id: +body.id }] : [],
    }),
    addSkill: builder.mutation({
      query: ({ id, time, ...skill }) => ({
        method: "PATCH",
        url: `skills/${time}.json`,
        body: { [id]: skill },
      }),
      invalidatesTags: [{ type: "skills", id: "list" }],
    }),
    removeSkill: builder.mutation<void, BaseApiProps>({
      query: ({ id, time }) => ({
        method: "DELETE",
        url: `skills/${time}/${id}.json`,
      }),
      invalidatesTags: [{ type: "skills", id: "list" }],
    }),
    updateSkill: builder.mutation<
      Pick<SkillData, "title">,
      Partial<SkillData> & { time: TimeVariants }
    >({
      query: ({ id, time, ...skillData }) => ({
        method: "PATCH",
        url: `skills/${time}/${id}.json`,
        body: skillData,
      }),
      invalidatesTags: (res, err, body) =>
        body?.id ? [{ type: "skills", id: +body.id }] : [],
    }),
    updateSteps: builder.mutation<void, BaseApiProps & { steps: StepData[] }>({
      query: ({ id, time, steps }) => ({
        method: "PATCH",
        url: `skills/${time}/${id}/steps.json`,
        body: steps.reduce((acc, step, ind) => ({ ...acc, [ind]: step }), {}),
      }),
      invalidatesTags: (res, err, body) => [{ type: "skills", id: +body.id }],
    }),
  }),
});

export const {
  useGetSkillsQuery,
  useGetSkillQuery,
  useAddSkillMutation,
  useRemoveSkillMutation,
  useUpdateSkillMutation,
  useUpdateStepsMutation,
} = skillsApi;
