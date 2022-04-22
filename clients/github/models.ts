export type GithubMetaData = {
  owner: string;
  name: string;
  /** Tool's id from Contentful */
  id: string;
};

/** Data returned from Github GraphQL endpoint */
export type GithubRepoData = {
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
      nodes: {
        name: string;
        isPrerelease: boolean;
        isDraft: string;
        publishedAt: string;
        tagName: string;
        url: string;
      }[];
    };
  };
};

export type GithubRepoDataWithId = GithubRepoData & { toolId: string };
