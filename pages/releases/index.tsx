import type { NextPage, GetStaticProps } from "next";

import { ToolFullDetails } from "../../models/tools";
import { getTools } from "../../utils/getAllTools";

const RELEASES_WINDOW = 30;

export const getStaticProps: GetStaticProps = async (context) => {
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
      releasesWindow: RELEASES_WINDOW,
      tools: lastReleases,
    },
  };
};

interface Props {
  tools: ToolFullDetails[];
  releasesWindow: string;
}

const Releases: NextPage<Props> = ({ tools, releasesWindow }) => {
  return (
    <div>
      <main>
        <h1>Releases</h1>
        <h5>{`Last ${releasesWindow} days`}</h5>
        {tools.map((t) => (
          <div key={t.fields.name}>
            <div>{t.fields.name}</div>
            <div>{t.github?.repository?.releases?.nodes[0]?.publishedAt}</div>
            <div>{t.github?.repository?.releases?.nodes[1]?.publishedAt}</div>
            <br />
          </div>
        ))}
      </main>
    </div>
  );
};

export default Releases;
