import { TagCollection } from "contentful";

export type Category =
  | "js"
  | "css"
  | "frontops"
  | "jam"
  | "seo"
  | "monitor"
  | "ux"
  | "utils";

type CategoryDict = {
  id: Category;
  name: string;
  desc: string;
};

const categoriesDict: CategoryDict[] = [
  {
    id: "js",
    name: "JavaScript",
    desc: "Assertively morph B2C methods of empowerment with end-to-end collaboration and idea-sharing. Credibly.",
  },
  {
    id: "css",
    name: "CSS",
    desc: "Assertively morph B2C methods of empowerment with end-to-end collaboration and idea-sharing. Credibly.",
  },
  {
    id: "frontops",
    name: "FrontOps",
    desc: "Assertively morph B2C methods of empowerment with end-to-end collaboration and idea-sharing. Credibly.",
  },
  {
    id: "jam",
    name: "JAM",
    desc: "Assertively morph B2C methods of empowerment with end-to-end collaboration and idea-sharing. Credibly.",
  },
  {
    id: "seo",
    name: "SEO",
    desc: "Assertively morph B2C methods of empowerment with end-to-end collaboration and idea-sharing. Credibly.",
  },
  {
    id: "monitor",
    name: "Monitoring",
    desc: "Assertively morph B2C methods of empowerment with end-to-end collaboration and idea-sharing. Credibly.",
  },
  {
    id: "ux",
    name: "UI/UX",
    desc: "Assertively morph B2C methods of empowerment with end-to-end collaboration and idea-sharing. Credibly.",
  },
  {
    id: "utils",
    name: "Utils",
    desc: "Assertively morph B2C methods of empowerment with end-to-end collaboration and idea-sharing. Credibly.",
  },
];

// TODO: Get it from "tags"
export const categories = categoriesDict.map((c) => c.id);

export const getCategoryDict = (c: Category) =>
  categoriesDict.find((cd) => cd.id === c) ?? {
    id: c,
    name: c,
    desc: "No descriptions",
  };
