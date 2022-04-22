export type GithubMetaData = {
  owner: string;
  name: string;
  /** Tool's id from Contentful */
  id: string;
};

/** Data returned from Github GraphQL endpoint */
export type GithubRepoData = {
  toolId: string;
  repository: {
    name: string;
    description: string;
    diskUsage: number;
    issues: Object[];
    stargazers: Object[];
    licenseInfo: Object[];
    pushedAt: string;
    releases: Object[];
  };
};
