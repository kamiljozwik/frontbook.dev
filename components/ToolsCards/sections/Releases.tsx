import {
  Badge,
  Group,
  MediaQuery,
  Stack,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { AlertTriangle } from "tabler-icons-react";

import { ToolFullDetails } from "../../../models/tools";
import { ReleaseBadge } from "../../common/ReleaseBadge";

interface Props {
  tool: ToolFullDetails;
}

const UNMAINTAINED_DATE = 30 * 12; // ~ one year

const referenceDate = new Date();
referenceDate.setDate(referenceDate.getDate() - UNMAINTAINED_DATE);

export const Releases = ({ tool }: Props) => {
  const theme = useMantineTheme();
  const releases = tool.github?.repository.releases.nodes.slice(0, 2);

  const isOutdated = new Date(releases?.[1]?.publishedAt ?? "") < referenceDate;

  return (
    <MediaQuery smallerThan="lg" styles={{ display: "none" }}>
      <Stack spacing="xs" style={{ width: "180px" }}>
        <Group>
          <Text>Last releases</Text>
          {isOutdated && (
            <Tooltip
              label="This tool looks like not maintained anymore."
              sx={{ height: "24px" }}
            >
              <AlertTriangle color={theme.colors.yellow[7]} />
            </Tooltip>
          )}
        </Group>
        {releases?.length != 0 ? (
          releases?.reverse().map((release) => (
            <div key={release.tagName}>
              <Text component="span" color={theme.colors.gray[6]}>
                {new Date(release.publishedAt).toISOString().split("T")[0]}
              </Text>
              <ReleaseBadge ml={10} release={release} />
            </div>
          ))
        ) : (
          <Badge style={{ width: "80px" }} color="gray">
            No data
          </Badge>
        )}
      </Stack>
    </MediaQuery>
  );
};
