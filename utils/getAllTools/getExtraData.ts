import { Entry } from "contentful";
import { clientGithub } from "../../clients/github";
import { ToolFullDetails } from "../../models/tools";
import { Tool } from "../../clients/contentful/models";
import { clientNpm } from "../../clients/npm";

/** Fetch all tools from contentful before build step begins. */
const getExtraData = async (allTools: Entry<Tool>[]) => {
  let toolsWithDetails: ToolFullDetails[] = [];

  console.log("Fetching extra data...");
  for (const tool of allTools) {
    const fetchGithub = clientGithub.getRepoDetails(tool.fields.github);
    const fetchNpm = clientNpm.getPackageDownloads(tool.fields.npm);

    const [github, npm] = await Promise.all([fetchGithub, fetchNpm]);

    toolsWithDetails = [...toolsWithDetails, { ...tool, github, npm }];
  }

  console.log("Fetching extra data finished");
  return toolsWithDetails;
};

export { getExtraData };
