export type GithubMetaData = {
  owner: string;
  name: string;
};

export type GithubRepoData = {
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
