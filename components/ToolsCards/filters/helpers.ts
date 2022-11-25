import { ToolFullDetails } from "../../../models/tools";

export const filters = (
  tool: ToolFullDetails,
  fields?: { github?: number; npm?: number }
) => {
  if (fields?.github) {
    const res =
      (tool.github?.repository.stargazers.totalCount ?? 0) >= fields.github;
    if (!res) return false;
  }

  if (fields?.npm) {
    const res = (tool.npm?.package.downloads ?? 0) >= fields.npm;
    if (!res) return false;
  }

  return true;
};
