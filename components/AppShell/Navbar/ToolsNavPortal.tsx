import { Portal } from "@mantine/core";
import { useRouter } from "next/router";
import { CalendarStats, Home, Tool } from "tabler-icons-react";

import { Category, getCategoryDict } from "../../../dictionaries/categories";

import { configs } from "./configs";
import { LinksGroup } from "./LinksGroup";

export interface Props {
  categories?: Category[];
}

const ToolsList = ({ categories }: Props) => {
  const router = useRouter();
  const { category } = router.query;

  if (!categories) return null;

  const toolsLink = categories.map((c) => ({
    label: getCategoryDict(c).name,
    link: `/tools/${c}`,
    isActive: category === c,
  }));

  const data = [
    {
      label: "Tools",
      icon: Tool,
      initiallyOpened: true,
      links: [{ label: "All categories", link: "/tools" }, ...toolsLink],
    },
    {
      label: "Releases",
      icon: CalendarStats,
      link: "/releases",
    },
  ];

  return (
    <>
      {data.map((item) => (
        <LinksGroup {...item} key={item.label} />
      ))}
    </>
  );
};

/**
 * It may looks strange that I use Portal and not import categories directly to components,
 * but it is like that in case I would like to use catgories fetched from API and not the
 * hardcoded one.
 */
const ToolsNavPortal = ({ categories }: Props) => {
  return (
    <Portal target={`#${configs.TOOLS_LIST_ID}`}>
      <ToolsList categories={categories} />
    </Portal>
  );
};

export { ToolsNavPortal };
