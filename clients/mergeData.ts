import { Entry } from "contentful";

import { Tool } from "../models/categoryPage";
import { GithubRepoData } from "./github/models";

export interface FullToolData extends Entry<Tool> {
  github: GithubRepoData | null;
}

const mergeData = (
  items: Entry<Tool>[],
  additionalData: [(GithubRepoData | null)[]]
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
