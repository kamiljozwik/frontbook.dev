import fs from "fs";
import path from "path";
import { ToolFullDetails } from "../../models/tools";

import { getToolsContentful } from "./getToolsContentful";
import { getExtraData } from "./getExtraData";

const TOOLS_CACHE_PATH = path.resolve(".tools");

type Args = {
  category?: string | string[];
  tag?: string | string[];
};

/** Get all tools from contentful API or from local cache file. */
const getTools = async ({ category, tag }: Args) => {
  let cachedData: ToolFullDetails[] = [];

  try {
    cachedData = JSON.parse(fs.readFileSync(TOOLS_CACHE_PATH, "utf8"));
    console.log("Using cached data for tools.");
  } catch (error) {
    console.log("Tools cache not initialized");
  }

  if (cachedData.length === 0) {
    console.log("Fetching fresh data for tools");
    const contentfulData = await getToolsContentful();
    const withExtraData = await getExtraData(contentfulData);

    cachedData = withExtraData;

    try {
      fs.writeFileSync(TOOLS_CACHE_PATH, JSON.stringify(cachedData), "utf8");
      console.log("Wrote tools cache to file");
    } catch (error) {
      console.log("💥 ERROR WRITING TOOLS CACHE TO FILE!");
      console.log(error);
    }
  }

  if (category || tag) {
    return category
      ? cachedData?.filter((tool) => tool.fields.category === category)
      : cachedData?.filter((tool) =>
          tool.metadata.tags
            .map((tLink) => tLink.sys.id)
            .includes(tag as string)
        );
  }

  return cachedData;
};

export { getTools };
