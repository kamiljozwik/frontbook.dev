import { Group, Paper } from "@mantine/core";

import { ToolFullDetails } from "../../../models/tools";
import {
  CardTitle,
  ExternalLinks,
  IssuesPrs,
  License,
  Releases,
  StarsDownloads,
} from "./sections";

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
