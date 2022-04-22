import { Entry } from "contentful";

import { Tool } from "../models/categoryPage";
import { GithubRepoDataWithId } from "./github/models";

export interface FullToolData extends Entry<Tool> {
  github: GithubRepoDataWithId | null;
}

const mergeData = (
  items: Entry<Tool>[],
  additionalData: [(GithubRepoDataWithId | null)[]]
): FullToolData[] => {
  return items.map((tool) => ({
    ...tool,
    /** Add Github data */
    github:
      additionalData[0]?.find(
        (githubData) => githubData && githubData.toolId === tool.sys.id
      ) ?? null,
  }));
};

export { mergeData };
