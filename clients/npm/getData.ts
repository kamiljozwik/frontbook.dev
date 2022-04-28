import { Entry } from "contentful";
import { clientNpm } from ".";
import { Tool } from "../../models/categoryPage";
import {
  NpmMetaData,
  NpmPackageDataWithId,
  PackageDownloadsResponse,
} from "./models";

const parseNpmUrl = (url: string) =>
  url.includes("@")
    ? `@${url.split("@").slice(-1)[0]}`
    : url.split("/").slice(-1)[0];

const getNpmDownloads = async (items: Entry<Tool>[]) => {
  const githubMetaData = items
    .map((item) => {
      if (!item.fields.npm) return undefined;

      return {
        packageName: item.fields.npm,
        id: item.sys.id,
      };
    })
    .filter((item): item is NpmMetaData => !!item);

  // const promises = githubMetaData.map(async (d) =>
  //   /** Use mock values in development */
  //   process.env.NODE_ENV === "development"
  //     ? await makeNpmRequest(d.packageName, d.id)
  //     : await makeNpmRequest(d.packageName, d.id)
  // );

  // return Promise.all(promises);

  for (const d of githubMetaData) {
    await makeNpmRequest(d.packageName, d.id);
  }
};

const makeNpmRequest = async (
  packageName: string,
  toolId: string,
  period = "last-week"
): Promise<NpmPackageDataWithId | null> => {
  try {
    console.log(`getting ${packageName}...`);
    const response = await clientNpm.get<PackageDownloadsResponse>(
      `/downloads/point/${period}/${parseNpmUrl(packageName)}`
    );
    console.log(`${packageName} done!`);
    return {
      npm: {
        downloads: response.data.downloads,
      },
      toolId,
    };
  } catch (error: any) {
    console.log(`💥 Cannot get NPM for ${packageName}`);
    console.log(error.message);
    return null;
  }
};

const getNpmData = {
  downloads: getNpmDownloads,
};

export { getNpmData };
