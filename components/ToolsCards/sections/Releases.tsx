import {
  Badge,
  Group,
  Stack,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { AlertTriangle } from "tabler-icons-react";

import { ToolFullDetails } from "../../../models/tools";

interface Props {
  tool: ToolFullDetails;
}

const UNMAINTAINED_DATE = 30 * 12; // ~ one year

const referenceDate = new Date();
referenceDate.setDate(referenceDate.getDate() - UNMAINTAINED_DATE);

export const Releases = ({ tool }: Props) => {
  const theme = useMantineTheme();
  const releases = tool.github?.repository.releases.nodes.slice(0, 3);

  const isOutdated = new Date(releases?.[1]?.publishedAt ?? "") < referenceDate;

  return (
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
            <Badge<"a">
              component="a"
              ml={10}
              variant="outline"
              href={release.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={(theme) => ({
                width: "80px",
                "&:hover": {
                  backgroundColor: theme.colors.blue[6],
                  cursor: "pointer",
                  color: "white",
                },
              })}
            >
              {release.tagName}
            </Badge>
          </div>
        ))
      ) : (
        <Badge style={{ width: "80px" }} color="gray">
          No data
        </Badge>
      )}
    </Stack>
  );
};
