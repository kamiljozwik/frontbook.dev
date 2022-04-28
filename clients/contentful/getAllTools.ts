import { EntryCollection } from "contentful";
import fs from "fs";
import path from "path";
import "dotenv/config";

import { Tool } from "../../models/categoryPage";
import { getContentfulData } from "./getData";

const TOOLS_CACHE_PATH = path.resolve(".tools");
console.log("TOOLS_CACHE_PATH", TOOLS_CACHE_PATH);

const getAllTools = async () => {
  let cachedData: EntryCollection<Tool> | undefined;

  try {
    cachedData = JSON.parse(fs.readFileSync(TOOLS_CACHE_PATH, "utf8"));
    console.log("Using cached data!");
  } catch (error) {
    console.log("Member cache not initialized");
  }

  if (!cachedData) {
    const data = await getContentfulData.allEntries();

    try {
      fs.writeFileSync(TOOLS_CACHE_PATH, JSON.stringify(data), "utf8");
      console.log("Wrote to members cache");
    } catch (error) {
      console.log("ERROR WRITING MEMBERS CACHE TO FILE");
      console.log(error);
    }

    cachedData = data;
  }

  return cachedData;
};

getAllTools();

export { getAllTools };
