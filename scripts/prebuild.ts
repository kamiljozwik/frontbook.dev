import "dotenv/config";
import { getTools } from "../utils/getAllTools";

/** Fetch all tools from contentful before Next.js build step begins. */
const generateData = async () => {
  const allTools = await getTools();
  console.log(`Fetched ${allTools.length} tools from Contentful API`);
};

generateData();
