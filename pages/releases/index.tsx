import type { NextPage, GetStaticProps } from "next";

import { ReleasesCards } from "../../components/ReleasesCards";
import { PageProps } from "../../models/page";
import { ToolFullDetails } from "../../models/tools";
import { categories } from "../../dictionaries/categories";
import { getTools } from "../../utils/getAllTools";
import { getReferenceDate } from "../../utils/getReferenceDate";
import { Text, Title } from "@mantine/core";

interface Props extends PageProps {
  tools: ToolFullDetails[];
  releasesWindow: number;
}

const RELEASES_WINDOW = 14; // days

const sortFn = (a: ToolFullDetails, b: ToolFullDetails) =>
  new Date(b.github?.repository.releases.nodes[0].publishedAt ?? "").getTime() -
  new Date(a.github?.repository.releases.nodes[0].publishedAt ?? "").getTime();

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const tools = await getTools({});

  /** Get releases for given time window */
  const referenceDate = getReferenceDate(RELEASES_WINDOW);

  const lastReleases = tools.filter((t) => {
    const releases = t.github?.repository?.releases?.nodes ?? [];
    if (releases.length > 0) {
      return new Date(releases[0].publishedAt) > referenceDate;
    }
  });

  return {
    props: {
      categories,
      releasesWindow: RELEASES_WINDOW,
      tools: lastReleases.sort(sortFn),
    },
  };
};

const Releases: NextPage<Props> = ({ tools, releasesWindow }) => {
  return (
    <div>
      <Title align="center">Releases</Title>
      <Text align="center" mb={20}>{`Last ${releasesWindow} days`}</Text>
      <ReleasesCards tools={tools} />
    </div>
  );
};

export default Releases;
