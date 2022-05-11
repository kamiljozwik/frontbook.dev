import { List, Portal } from "@mantine/core";
import Link from "next/link";

import { configs } from "./configs";

export interface Props {
  categories?: string[];
}

const ToolsList = ({ categories }: Props) => {
  if (!categories) return null;

  return (
    <List>
      {categories.map((category) => (
        <List.Item key={category}>
          <Link href={`/tools/${category}`}>
            <a>{category}</a>
          </Link>
        </List.Item>
      ))}
    </List>
  );
};

const ToolsNavPortal = ({ categories }: Props) => {
  return (
    <Portal target={`#${configs.TOOLS_LIST_ID}`}>
      <ToolsList categories={categories} />
    </Portal>
  );
};

export { ToolsNavPortal };
