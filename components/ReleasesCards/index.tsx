import { Card, Group, Stack } from "@mantine/core";
import React from "react";
import { ToolFullDetails } from "../../models/tools";

interface Props {
  tools: ToolFullDetails[];
}

export const ReleasesCards = ({ tools }: Props) => {
  return (
    <Group position="center">
      {tools.map((t) => (
        <Card key={t.fields.name} shadow="sm" p="lg">
          <b>{t.fields.name}</b>
          <div>{t.github?.repository?.releases?.nodes[0]?.publishedAt}</div>
          <div>{t.github?.repository?.releases?.nodes[1]?.publishedAt}</div>
        </Card>
      ))}
    </Group>
  );
};
