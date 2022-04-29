import { createClient } from "contentful";
import { Tool } from "./models";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});

const clientContentful = {
  allEntries: async (limit = 500, skip = 0) => {
    try {
      console.log("Fetching all tools from Contentful API...");
      return client.getEntries<Tool>({
        content_type: "toolEntry",
        limit,
        skip,
      });
    } catch (error) {
      console.log(`💥 Cannot get entries data from Contentful`);
      console.log(error);
    }
  },
  allTags: async () => {
    try {
      console.log("Fetching all tags from Contentful API...");
      return client.getTags();
    } catch (error) {
      console.log(`💥 Cannot get tags from Contentful`);
      console.log(error);
    }
  },
};

export { clientContentful };
