export type GithubMetaData = {
  owner: string;
  name: string;
};

/** Data returned from Github GraphQL endpoint */
export type GithubRepoDetails = {
  repository: Repository;
};

export type Repository = {
  name: string;
  description: string;
  diskUsage: number;
  openGraphImageUrl: string;
  owner: {
    avatarUrl: string;
  };
  issues: {
    totalCount: number;
  };
  pullRequests: {
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
  isArchived: boolean;
  releases: {
    nodes: Release[];
  };
};

export type Release = {
  name: string;
  isPrerelease: boolean;
  isDraft: boolean;
  publishedAt: string;
  tagName: string;
  url: string;
  shortDescriptionHTML: string;
  isLatest: boolean;
};
