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

    const referenceDate = getReferenceDate(RELEASE_PERIOD);
    const releasedWithin24h =
      new Date(lastReleases[0]?.publishedAt) > referenceDate;
    const isLatest = lastReleases[0]?.isLatest;

    if (
      releasedWithin24h &&
      isLatest &&
      lastReleases.length >= 2 &&
      downloads
    ) {
      const [releaseType] = getReleaseType(lastReleases);

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
    // TODO: check here Vercel env var and run only on Vercel build
    // TODO: use Firebase SDK to send tweet
    const tweetContent = await axios.post(
      process.env.FB_ENV === "local"
        ? (process.env.TWITTER_FN_LOCAL as string)
        : (process.env.TWITTER_FN as string),
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Tweet send successfully!");
    console.log(tweetContent.data);
  } catch {
    console.log("💥 Tweet not send.");
  }
};
