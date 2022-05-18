import { Stack } from "@mantine/core";

import { ToolFullDetails } from "../../models/tools";
import { ToolCard } from "./ToolCard";

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
        <ToolCard key={tool.sys.id} tool={tool} />
      ))}
    </Stack>
  );
};
