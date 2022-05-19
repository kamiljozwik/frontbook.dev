import { Badge, BadgeVariant, Card, Group, Text, Title } from "@mantine/core";
import { ArrowRight, Calendar } from "tabler-icons-react";

import { ToolFullDetails } from "../../models/tools";
import { Count } from "../common/Count";
import { ReleaseBadge } from "../common/ReleaseBadge";

interface Props {
  tools: ToolFullDetails[];
}

const badgeProps = {
  variant: "filled" as BadgeVariant,
  width: "auto",
  maxWidth: "140px",
};

export const ReleasesCards = ({ tools }: Props) => {
  return (
    <Group position="center">
      {tools.map((t) => {
        const releases = t.github?.repository?.releases?.nodes ?? [];
        return (
          <Card key={t.fields.name} shadow="xs" p="lg" sx={{ width: "400px" }}>
            <Group spacing="xs">
              <Calendar strokeWidth={1} color="gray" />
              <Text color="gray">
                {new Date(releases[0]?.publishedAt ?? "").toLocaleDateString()}
              </Text>
            </Group>
            <Title mt="sm" order={4}>
              {t.fields.name}
            </Title>
            <Group>
              <Count
                count={t.github?.repository.stargazers.totalCount}
                icon="github"
              />
              <Count count={t.npm?.package.downloads} icon="npm" />
            </Group>
            <Text lineClamp={1}>
              {t.github?.repository?.description ?? t.fields.slogan}
            </Text>
            <Group mt="sm" spacing="xs">
              <ReleaseBadge release={releases[1]} {...badgeProps} />
              <ArrowRight />
              <ReleaseBadge release={releases[0]} {...badgeProps} />
            </Group>
            <Group mt="sm" spacing="xs">
              {releases[0]?.isPrerelease && (
                <Badge variant="outline" color="gray">
                  Prerelease
                </Badge>
              )}
              {releases[0]?.isDraft && (
                <Badge color="gray" variant="outline">
                  Draft
                </Badge>
              )}
            </Group>
          </Card>
        );
      })}
    </Group>
  );
};
