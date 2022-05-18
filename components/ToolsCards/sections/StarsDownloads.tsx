import { Indicator } from "@mantine/core";

import { ToolFullDetails } from "../../../models/tools";
import { Count } from "../../common/Count";

interface Props {
  tool: ToolFullDetails;
}

const Npm = ({ count }: { count?: number }) => (
  <Count icon="npm" count={count} tail="weekly downloads" />
);

export const StarsDownloads = ({ tool }: Props) => {
  return (
    <div style={{ minWidth: "230px" }}>
      {(tool.npm?.package.downloads ?? 0) > 1000000 ? (
        <Indicator
          inline
          label="Hot!"
          size={16}
          color="red"
          position="top-start"
        >
          <Npm count={tool.npm?.package.downloads} />
        </Indicator>
      ) : (
        <Npm count={tool.npm?.package.downloads} />
      )}
      <Count
        icon="github"
        count={tool.github?.repository.stargazers.totalCount}
        tail="GitHub stars"
      />
    </div>
  );
};
