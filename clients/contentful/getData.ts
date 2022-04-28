import { clientContentful } from ".";
import { Tool } from "../../models/categoryPage";

const getContentfulData = {
  entriesByCategory: async (category?: string | string[]) => {
    if (!category) {
      console.log("💥 No category provided");
      return;
    }

    try {
      console.log(`Fetching tools for ${category} from Contentful API...`);
      return clientContentful.getEntries<Tool>({
        content_type: "toolEntry",
        "fields.category": category,
        limit: 999,
      });
    } catch (error) {
      console.log(`💥 Cannot get data for Contentful category: ${category}`);
      console.log(error);
    }
  },
  allEntries: async (limit = 500, skip = 0) => {
    try {
      console.log("Fetching all tools from Contentful API...");
      return clientContentful.getEntries<Tool>({
        content_type: "toolEntry",
        limit,
        skip,
      });
    } catch (error) {
      console.log(`💥 Cannot get entries data from Contentful`);
      console.log(error);
    }
  },
};

export { getContentfulData };
