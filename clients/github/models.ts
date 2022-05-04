export type GithubMetaData = {
  owner: string;
  name: string;
};

/** Data returned from Github GraphQL endpoint */
export type GithubRepoDetails = {
  repository: {
    name: string;
    description: string;
    diskUsage: number;
    issues: {
      totalCount: number;
    };
    stargazers: {
      totalCount: number;
    };
    licenseInfo: {
      spdxId: string;
      url: string;
    };
    pushedAt: string;
    releases: {
      nodes: Release[];
    };
  };
};

type Release = {
  name: string;
  isPrerelease: boolean;
  isDraft: string;
  publishedAt: string;
  tagName: string;
  url: string;
};
