import { Entry } from "contentful";

import { clientContentful } from "../../clients/contentful";
import { Tool } from "../../clients/contentful/models";

/** Get all tools from contentful API or from local cache file. */
const getToolsContentful = async () => {
  let cachedData: Entry<Tool>[] = [];

  const limit = 500;
  let skip = 0;
  const fetchData = async () => {
    const data = await clientContentful.allEntries(limit, skip);
    cachedData = [...cachedData, ...(data?.items ?? [])];
    if (cachedData.length !== data?.total) {
      skip = skip + limit;
      await fetchData();
    }
  };

  await fetchData();

  return cachedData;
};

export { getToolsContentful };
