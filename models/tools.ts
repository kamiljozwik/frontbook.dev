import { Entry } from "contentful";
import { Tool } from "../clients/contentful/models";
import { GithubRepoDetails } from "../clients/github/models";
import { NpmPackageDetails } from "../clients/npm/models";

export interface ToolFullDetails extends Entry<Tool> {
  github: GithubRepoDetails | null;
  npm: NpmPackageDetails | null;
}
