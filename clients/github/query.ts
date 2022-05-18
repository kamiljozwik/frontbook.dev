import { gql } from "graphql-request";

export const query = (owner: string, name: string) => gql`
query {
  repository(owner:"${owner}", name:"${name}") {
    name
    description
    diskUsage
    issues(states:OPEN) {
      totalCount
    }
    pullRequests(states:OPEN) {
      totalCount
    }
    stargazers {
      totalCount
    }
    licenseInfo {
      spdxId
      url
    }
    openGraphImageUrl
    owner {
      avatarUrl
    }
    pushedAt
    isArchived
    releases(last: 5) {
      nodes {
        name
        tagName
				shortDescriptionHTML
        isPrerelease
        isDraft
        isLatest
        publishedAt
        tagName
        url
      }
    }
  }
}
`;
