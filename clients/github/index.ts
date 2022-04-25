import { GraphQLClient } from "graphql-request";

const endpoint = "https://api.github.com/graphql";

const clientGithub = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
});

export { clientGithub };
