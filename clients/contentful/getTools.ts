import { Entry } from "contentful";
import fs from "fs";
import path from "path";

import { Tool } from "../../models/categoryPage";
import { getContentfulData } from "./getData";

const TOOLS_CACHE_PATH = path.resolve(".tools");

/** Get all tools from contentful API or from local cache file. */
const getTools = async (category?: string | string[]) => {
  let cachedData: Entry<Tool>[] = [];

  try {
    cachedData = JSON.parse(fs.readFileSync(TOOLS_CACHE_PATH, "utf8"));
  } catch (error) {
    console.log("Tools cache not initialized");
  }

  if (cachedData.length === 0) {
    const limit = 500;
    let skip = 0;
    const fetchData = async () => {
      const data = await getContentfulData.allEntries(limit, skip);
      cachedData = [...cachedData, ...(data?.items ?? [])];
      if (cachedData.length !== data?.total) {
        skip = skip + limit;
        await fetchData();
      }
    };

    await fetchData();

    try {
      fs.writeFileSync(TOOLS_CACHE_PATH, JSON.stringify(cachedData), "utf8");
      console.log("Wrote tools cache to file");
    } catch (error) {
      console.log("💥 ERROR WRITING TOOLS CACHE TO FILE!");
      console.log(error);
    }
  }

  console.log(`Fetched ${cachedData.length} tools from Contentful API`);

  return category
    ? cachedData?.filter((tool) => tool.fields.category === category)
    : cachedData;
};

export { getTools };
