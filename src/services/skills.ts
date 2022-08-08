import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SkillData, TimeVariants } from "../types/types";

type ResponseSkillData = Partial<
  Record<TimeVariants, Record<string, Omit<SkillData, "id">>>
>;
type MappedSkillData = Partial<Record<TimeVariants, SkillData[]>>;

export const skillsApi = createApi({
  reducerPath: "skillsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://learning-app-c4963-default-rtdb.firebaseio.com/",
  }),
  tagTypes: ["skills"],
  endpoints: (builder) => ({
    getSkills: builder.query<MappedSkillData, void>({
      query: () => ({ url: "skills.json" }),
      transformResponse: (response: ResponseSkillData, meta, arg) => {
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
      providesTags: ["skills"],
    }),
    addSkill: builder.mutation({
      query: ({ id, skill, time }) => ({
        method: "PATCH",
        url: `skills/${time}.json`,
        body: { [id]: skill },
      }),
      invalidatesTags: ["skills"],
    }),
    removeSkill: builder.mutation<any, { id: string; time: TimeVariants }>({
      query: ({ id, time }) => ({
        method: "DELETE",
        url: `skills/${time}/${id}.json`,
      }),
      invalidatesTags: ["skills"],
    }),
  }),
});

export const {
  useGetSkillsQuery,
  useAddSkillMutation,
  useRemoveSkillMutation,
} = skillsApi;
