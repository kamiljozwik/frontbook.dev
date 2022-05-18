import { Badge, Group, Tooltip } from "@mantine/core";
import { useEffect, useState } from "react";
import { ToolFullDetails } from "../../../../models/tools";

interface Prosp {
  tool: ToolFullDetails;
}

export const Labels = ({ tool }: Prosp) => {
  const [framework, setFramework] = useState<string>();

  useEffect(() => {
    const frameworks = ["react", "vue", "angular", "svelte"];

    const stringsToCheck = [
      tool.github?.repository.description?.toLowerCase(),
      tool.github?.repository.name?.toLowerCase(),
      tool.fields.slogan?.toLowerCase(),
    ];

    frameworks.forEach((f) => {
      stringsToCheck.forEach((s) => {
        if (s?.includes(f)) {
          setFramework(f);
        }
      });
    });
  }, [tool]);

  return (
    <Group mt="xs">
      {framework && (
        // TODO: add framework's icon
        <Badge variant="outline" color="gray">
          {framework}
        </Badge>
      )}
      {tool.github?.repository.isArchived && (
        <Tooltip label="This repository is archived.">
          <Badge variant="outline" color="yellow">
            Archived
          </Badge>
        </Tooltip>
      )}
    </Group>
  );
};
