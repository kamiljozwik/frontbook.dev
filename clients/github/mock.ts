import { faker } from "@faker-js/faker";
import { GithubRepoDetails } from "./models";

export const getMockedGithubData = (name: string): GithubRepoDetails => {
  const tag = faker.system.semver();
  const releaseType = faker.datatype.number({ min: 0, max: 2 });
  const nextTag = tag
    .split(".")
    .map((el, index) => (index === releaseType ? parseInt(el) + 1 : el))
    .join(".");
  return {
    repository: {
      name: name,
      description: faker.lorem.sentence(),
      diskUsage: faker.datatype.number({ min: 0, max: 1000 }),
      issues: {
        totalCount: faker.datatype.number({ min: 0, max: 200 }),
      },
      stargazers: {
        totalCount: faker.datatype.number({ min: 0, max: 100000 }),
      },
      licenseInfo: {
        spdxId: faker.random.arrayElement([
          "MIT",
          "NOASSERTION",
          "Apache-2.0",
          "BSD-3-Clause",
        ]),
        url: "https://google.com",
      },
      pushedAt: faker.date.past(1).toISOString(),
      releases: {
        nodes: [
          {
            name: name,
            isPrerelease: faker.datatype.boolean(),
            isDraft: "false",
            publishedAt: new Date().toISOString(),
            tagName: tag,
            url: "https://github.com/facebook/react/releases/tag/v16.12.0",
          },
          {
            name: name,
            isPrerelease: faker.datatype.boolean(),
            isDraft: "false",
            publishedAt: faker.date
              .between(
                new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 120),
                new Date()
              )
              .toISOString(),
            tagName: nextTag,
            url: "https://github.com/facebook/react/releases/tag/v16.13.0",
          },
        ],
      },
    },
  };
};
