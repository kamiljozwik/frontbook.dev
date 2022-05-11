import { Paper, Stack } from "@mantine/core";
import React from "react";

import { ToolFullDetails } from "../../models/tools";

interface Props {
  tools: ToolFullDetails[];
}

export const ToolsCards = ({ tools }: Props) => {
  return (
    <Stack
      justify="flex-start"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
        height: 300,
      })}
    >
      {tools?.map((tool) => (
        <Paper shadow="xs" p="md" key={tool.sys.id}>
          <div>{tool.fields.name}</div>
          <div>{tool.fields.github}</div>
          <div>{tool.github?.repository.description}</div>
          <div>NPM Downloads: {tool.npm?.package.downloads}</div>
        </Paper>
      ))}
    </Stack>
  );
};
