import { Stack } from "@mantine/core";

import { ToolCard } from "./ToolCard";
import { useToolCards } from "./ToolsCardsContext";

export const ToolsList = () => {
  const toolsList = useToolCards();

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
      {toolsList.map((tool) => (
        <ToolCard key={tool.sys.id} tool={tool} />
      ))}
    </Stack>
  );
};
