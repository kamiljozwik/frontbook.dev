import fs from "fs";
import path from "path";
import { ToolFullDetails } from "../../models/tools";

import { getToolsContentful } from "./getToolsContentful";
import { getExtraData } from "./getExtraData";

const TOOLS_CACHE_PATH = path.resolve(".tools");

/** Get all tools from contentful API or from local cache file. */
const getTools = async (category?: string | string[]) => {
  let cachedData: ToolFullDetails[] = [];

  try {
    cachedData = JSON.parse(fs.readFileSync(TOOLS_CACHE_PATH, "utf8"));
  } catch (error) {
    console.log("Tools cache not initialized");
  }

  if (cachedData.length === 0) {
    const contentfulData = await getToolsContentful();
    const withGithub = await getExtraData(contentfulData);

    cachedData = withGithub;

    try {
      fs.writeFileSync(TOOLS_CACHE_PATH, JSON.stringify(cachedData), "utf8");
      console.log("Wrote tools cache to file");
    } catch (error) {
      console.log("💥 ERROR WRITING TOOLS CACHE TO FILE!");
      console.log(error);
    }
  }

  return category
    ? cachedData?.filter((tool) => tool.fields.category === category)
    : cachedData;
};

export { getTools };
