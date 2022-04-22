import { Entry } from "contentful";
import { GraphQLClient } from "graphql-request";

import { Tool } from "../../models/categoryPage";
import { GithubMetaData, GithubRepoData } from "./models";
import { query } from "./query";

const endpoint = "https://api.github.com/graphql";

const clientGithub = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
});

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

  const promises = githubMetaData.map((u) =>
    makeGithubRequest(u.owner, u.name, u.id)
  );

  return Promise.all(promises);
};

/** Query Github with GraphQL */
const makeGithubRequest = async (
  owner: string,
  name: string,
  toolId: string
) => {
  try {
    const response = await clientGithub.request<GithubRepoData>(
      query(owner, name)
    );
    return { ...response, toolId };
  } catch (error) {
    console.log(`Cannot get data for Github repo: ${owner}/${name}`);
    return null;
  }
};

export { getGithubData };
