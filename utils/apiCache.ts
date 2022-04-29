import fs from "fs";
import path from "path";

type Args<R> = {
  fileName: string;
  fn: () => Promise<R>;
};

const apiCache = async <R>({ fileName, fn }: Args<R>) => {
  const CACHE_PATH = path.resolve(fileName);
  let cachedData: R | undefined;

  try {
    cachedData = JSON.parse(fs.readFileSync(CACHE_PATH, "utf8"));
    console.log(`Using cached data for ${fileName}`);
  } catch (error) {
    console.log(`Cache not initialized for ${fileName}`);
  }

  if (!cachedData) {
    console.log(`Fetching fresh data for ${fileName}`);
    const response = await fn();
    cachedData = response;

    try {
      fs.writeFileSync(CACHE_PATH, JSON.stringify(cachedData), "utf8");
      console.log(`Wrote cache to file for ${fileName}`);
    } catch (error) {
      console.log(`💥 ERROR WRITING CACHE TO FILE fro ${fileName}!`);
      console.log(error);
    }
  }

  return cachedData;
};

export { apiCache };
