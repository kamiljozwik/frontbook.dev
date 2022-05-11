import { Navbar } from "@mantine/core";
import Link from "next/link";

import { configs } from "./configs";

interface Props {
  opened: boolean;
}

export const Navigation = ({ opened }: Props) => {
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <Navbar.Section id={configs.TOOLS_LIST_ID}>
        <Link href="/tools">
          <a>All categories</a>
        </Link>
      </Navbar.Section>
      <Navbar.Section grow mt="md">
        <Link href="/releases">
          <a>Last Releases</a>
        </Link>
      </Navbar.Section>
    </Navbar>
  );
};
