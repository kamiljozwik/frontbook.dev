import { Entry } from "contentful";
import { clientGithub } from ".";

import { query } from "./query";
import { getMockedGithubData } from "./mock";
import { GithubMetaData, GithubRepoData, GithubRepoDataWithId } from "./models";
import { Tool } from "../../models/categoryPage";

const getGithubData = async (items: Entry<Tool>[]) => {
  const githubMetaData = items
    .map((item) => {
      if (!item.fields.github) return undefined;

      const splitted = item.fields.github.split("/").filter(Boolean);
      const length = splitted.length;
      return {
        owner: splitted[length - 2],
        name: splitted[length - 1],
        id: item.sys.id,
      };
    })
    .filter((item): item is GithubMetaData => !!item);

  const promises = githubMetaData.map((d) =>
    /** Use mock values in development */
    process.env.NODE_ENV === "development"
      ? Promise.resolve(getMockedGithubData(d.name, d.id))
      : makeGithubRequest(d.owner, d.name, d.id)
  );

  return Promise.all(promises);
};

/** Query Github with GraphQL */
const makeGithubRequest = async (
  owner: string,
  name: string,
  toolId: string
): Promise<GithubRepoDataWithId | null> => {
  try {
    const response = await clientGithub.request<GithubRepoData>(
      query(owner, name)
    );
    return { ...response, toolId };
  } catch (error) {
    console.log(`💥 Cannot get data for Github repo: ${owner}/${name}`);
    console.log(error);
    return null;
  }
};

export { getGithubData };
