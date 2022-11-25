import { Stack } from "@mantine/core";
import { filters } from "./filters/helpers";
import { sortingFns } from "./sorting/helpers";

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
      {toolsList.tools
        .filter((el) => filters(el, toolsList.filters))
        .sort(sortingFns[toolsList.sorting])
        .map((tool) => (
          <ToolCard key={tool.sys.id} tool={tool} />
        ))}
    </Stack>
  );
};
