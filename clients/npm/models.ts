export type NpmMetaData = {
  packageName: string;
  /** Tool's id from Contentful */
  id: string;
};

export type PackageDownloadsResponse = {
  downloads: number;
  start: string;
  end: string;
  package: string;
};

export type NpmPackageData = {
  npm: {
    downloads: number;
  };
};

export type NpmPackageDataWithId = NpmPackageData & { toolId: string };
