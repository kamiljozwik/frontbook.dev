import { ToolFullDetails } from "../../../models/tools";
import { Count } from "../../common/Count";

interface Props {
  tool: ToolFullDetails;
}

export const IssuesPrs = ({ tool }: Props) => {
  return (
    <div style={{ minWidth: "200px" }}>
      <Count
        icon="issues"
        count={tool.github?.repository.issues.totalCount}
        tail="open issues"
      />
      <Count
        icon="pr"
        count={tool.github?.repository.pullRequests.totalCount}
        tail="open PRs"
      />
    </div>
  );
};
