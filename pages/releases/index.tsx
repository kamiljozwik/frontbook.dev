import type { NextPage, GetStaticProps } from "next";
import { ReleasesCards } from "../../components/ReleasesCards";

import { PageProps } from "../../models/page";
import { ToolFullDetails } from "../../models/tools";
import { categories } from "../../utils/categories";
import { getTools } from "../../utils/getAllTools";

interface Props extends PageProps {
  tools: ToolFullDetails[];
  releasesWindow: number;
}

const RELEASES_WINDOW = 30; // days

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const tools = await getTools({});

  /** Get releases for given time window */
  const referenceDate = new Date();
  referenceDate.setDate(referenceDate.getDate() - RELEASES_WINDOW);

  const lastReleases = tools.filter((t) => {
    const releases = t.github?.repository?.releases?.nodes ?? [];
    if (releases.length > 0) {
      return (
        // Last item is the current release
        new Date(releases[releases.length - 1].publishedAt) > referenceDate
      );
    }
  });

  return {
    props: {
      categories,
      releasesWindow: RELEASES_WINDOW,
      tools: lastReleases,
    },
  };
};

const Releases: NextPage<Props> = ({ tools, releasesWindow }) => {
  return (
    <div>
      <main>
        <h1>Releases</h1>
        <h5>{`Last ${releasesWindow} days`}</h5>
        <ReleasesCards tools={tools} />
      </main>
    </div>
  );
};

export default Releases;
