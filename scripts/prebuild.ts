import "dotenv/config";
import { getTools } from "../clients/contentful/getTools";

/** Fetch all tools from contentful before build step begins. */
getTools();
