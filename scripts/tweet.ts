import axios from "axios";

import { Release } from "../clients/github/models";
import { ToolFullDetails } from "../models/tools";
import { getReferenceDate } from "../utils/getReferenceDate";
import { getReleaseType } from "../utils/getReleaseType";

type TweetRelease = Release & {
  repoName: string;
  releaseType: string;
  downloads: number;
};

const RELEASE_PERIOD = 1; // 1 Day (24h)

export const tweet = async (allTools: ToolFullDetails[]) => {
  console.log("Preparing tweet...");

  const releases = allTools.reduce((acc, tool) => {
    const lastReleases = tool.github?.repository.releases.nodes ?? [];
    const downloads = tool.npm?.package.downloads;

    const [releaseType] = getReleaseType(lastReleases);

    const referenceDate = getReferenceDate(RELEASE_PERIOD);
    const releasedWithin24h =
      new Date(lastReleases[0]?.publishedAt) > referenceDate;
    const isLatest = lastReleases[0]?.isLatest;
    const isImportant = ["major", "minor"].includes(releaseType);

    if (
      releasedWithin24h &&
      isLatest &&
      isImportant &&
      lastReleases.length >= 2 &&
      downloads
    ) {
      const release: TweetRelease = {
        ...lastReleases[0],
        repoName: tool.github?.repository.name ?? tool.fields.name,
        releaseType,
        downloads,
      };

      return [...acc, release];
    }

    return acc;
  }, [] as TweetRelease[]);

  const data = releases.sort((a, b) => b.downloads - a.downloads).slice(0, 10);

  try {
    // TODO: use Firebase SDK to send tweet
    /** Create "prod" tweet only during Vercel's build  */
    await axios.post(
      process.env.VERCEL === "1"
        ? (process.env.TWITTER_FN as string)
        : (process.env.TWITTER_FN_LOCAL as string),
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Tweet send successfully!");
  } catch {
    console.log("💥 Tweet not send.");
  }
};
