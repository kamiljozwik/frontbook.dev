import { Group, Paper } from "@mantine/core";

import { ToolFullDetails } from "../../models/tools";
import { CardTitle } from "./sections/CardTitle";
import { ExternalLinks } from "./sections/ExternalLinks";
import { IssuesPrs } from "./sections/IssuesPrs";
import { License } from "./sections/License";
import { Releases } from "./sections/Releases";
import { StarsDownloads } from "./sections/StarsDownloads";

interface Props {
  tool: ToolFullDetails;
}

export const ToolCard = ({ tool }: Props) => {
  return (
    <>
      <Paper shadow="xs" p="md">
        <Group position="apart" noWrap>
          <CardTitle tool={tool} />
          <StarsDownloads tool={tool} />
          <IssuesPrs tool={tool} />
          <Releases tool={tool} />
          <License repository={tool.github?.repository} />
          <ExternalLinks tool={tool} />
        </Group>
      </Paper>
    </>
  );
};
