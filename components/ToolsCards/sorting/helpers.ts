import type { ToolFullDetails } from "../../../models/tools";

export const sortingOptions = ["stars", "downloads"] as const;
export type SortingType = typeof sortingOptions[number];

const stars = (a: ToolFullDetails, b: ToolFullDetails) =>
  (a.github?.repository.stargazers.totalCount ?? 0) >
  (b.github?.repository.stargazers.totalCount ?? 0)
    ? -1
    : 1;

const downloads = (a: ToolFullDetails, b: ToolFullDetails) =>
  (a.npm?.package.downloads ?? 0) > (b.npm?.package.downloads ?? 0) ? -1 : 1;

export const sortingFns: {
  [key in SortingType]: (a: ToolFullDetails, b: ToolFullDetails) => number;
} = { stars, downloads };
