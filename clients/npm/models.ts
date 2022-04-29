export type NpmMetaData = {
  packageName: string;
};

export type PackageDownloadsResponse = {
  downloads: number;
  start: string;
  end: string;
  package: string;
};

export type NpmPackageDetails = {
  package: {
    downloads: number;
  };
};
