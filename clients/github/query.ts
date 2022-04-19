import { gql } from "graphql-request";

export const query = (owner: string, name: string) => gql`
query {
  repository(owner:"${owner}", name:"${name}") {
    name
    description
    diskUsage
    issues {
      totalCount
    }
    stargazers {
      totalCount
    }
    licenseInfo {
      spdxId
      url
    }
    pushedAt
    releases(last: 2) {
      nodes {
        name
        isPrerelease
        isDraft
        publishedAt
        tagName
        url
      }
    }
  }
}
`;
