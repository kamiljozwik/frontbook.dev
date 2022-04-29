import { GraphQLClient } from "graphql-request";
import { GithubRepoDetails } from "./models";
import { query } from "./query";

const endpoint = "https://api.github.com/graphql";

const client = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
});

/** Query Github with GraphQL */
const clientGithub = {
  getRepoDetails: async (repo?: string): Promise<GithubRepoDetails | null> => {
    if (!repo) return null;

    const splitted = repo.split("/").filter(Boolean);
    const length = splitted.length;

    const owner = splitted[length - 2];
    const name = splitted[length - 1];
    try {
      const response = await client.request<GithubRepoDetails>(
        query(owner, name)
      );
      return response;
    } catch (error) {
      console.log(`💥 Cannot get data for Github repo: ${repo}`);
      return null;
    }
  },
};

export { clientGithub };
