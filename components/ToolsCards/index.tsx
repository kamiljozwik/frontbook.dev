import { Flex, Paper } from "@mantine/core";

import { ToolFullDetails } from "../../models/tools";
import { Filters } from "./filters/Filters";
import { Sorting } from "./sorting/Sorting";
import { ToolCardsProvider } from "./ToolsCardsContext";
import { ToolsList } from "./ToolsList";

interface Props {
  tools: ToolFullDetails[];
}

export const ToolsCards = ({ tools }: Props) => {
  return (
    <ToolCardsProvider initTools={tools}>
      <Paper mb={30} p={10} withBorder>
        <Flex justify={"space-between"}>
          <Filters />
          <Sorting />
        </Flex>
      </Paper>
      <ToolsList />
    </ToolCardsProvider>
  );
};
