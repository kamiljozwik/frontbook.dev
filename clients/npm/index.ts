import axios from "axios";
import { NpmPackageDetails, PackageDownloadsResponse } from "./models";

const client = axios.create({
  baseURL: "https://api.npmjs.org/",
});

const clientNpm = {
  getPackageDownloads: async (
    packageName?: string,
    period = "last-week"
  ): Promise<NpmPackageDetails | null> => {
    if (!packageName) return null;

    try {
      const response = await client.get<PackageDownloadsResponse>(
        `/downloads/point/${period}/${parseNpmUrl(packageName)}`
      );
      return {
        package: {
          downloads: response.data.downloads,
        },
      };
    } catch (error: any) {
      console.log(`💥 Cannot get NPM details for ${packageName}`);
      return null;
    }
  },
};

const parseNpmUrl = (url: string) =>
  url.includes("@")
    ? `@${url.split("@").slice(-1)[0]}`
    : url.split("/").slice(-1)[0];

export { clientNpm };
