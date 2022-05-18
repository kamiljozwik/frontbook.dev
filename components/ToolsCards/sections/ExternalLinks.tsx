import { Stack } from "@mantine/core";

import { ToolFullDetails } from "../../../models/tools";
import { ExternalIconLink } from "../../common/ExternalIconLink";

interface Props {
  tool: ToolFullDetails;
}

export const ExternalLinks = ({ tool }: Props) => {
  return (
    <div>
      <Stack spacing="xs">
        <ExternalIconLink
          icon="github"
          link={tool.fields.github}
          ariaLabel="Link to GitHub"
        />
        <ExternalIconLink
          icon="npm"
          link={tool.fields.npm}
          ariaLabel="Link to NPM"
        />
        <ExternalIconLink
          icon="website"
          link={tool.fields.website}
          ariaLabel="Link to website"
        />
      </Stack>
    </div>
  );
};
