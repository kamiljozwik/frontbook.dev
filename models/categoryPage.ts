import { FullToolData } from "../clients/mergeData";

export interface Props {
  tools: FullToolData[];
}

/** Type of the tool returned from Contentful */
export type Tool = {
  name: string;
  category: string;
  subcategory: string;
  slogan?: string;
  github?: string;
  npm?: string;
  website?: string;
};
