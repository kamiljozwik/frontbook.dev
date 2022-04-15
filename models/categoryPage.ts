import { Entry } from "contentful";

export interface Props {
  tools: Entry<Tool>[];
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
