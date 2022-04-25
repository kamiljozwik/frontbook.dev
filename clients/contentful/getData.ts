import { clientContentful } from ".";
import { Tool } from "../../models/categoryPage";

const getContentfulData = {
  entriesByCategory: async (category?: string | string[]) => {
    if (!category) {
      console.log("💥 No category provided");
      return;
    }

    try {
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
};

export { getContentfulData };
