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

      const splitted = item.fields.github.split("/");
      const length = splitted.length;
      return { owner: splitted[length - 2], name: splitted[length - 1] };
    })
    .filter((item): item is GithubMetaData => !!item);

  const promises = githubMetaData.map((u) =>
    makeGithubRequest(u.owner, u.name)
  );

  return Promise.all<GithubRepoData>(promises);
};

/** Query Github with GraphQL */
const makeGithubRequest = async (owner: string, name: string) => {
  try {
    const response = await clientGithub.request(query(owner, name));
    return response;
  } catch (error) {
    console.log(`Cannot get data for Github repo: ${owner}/${name}`);
    return null;
  }
};

export { clientGithub, getGithubData };
