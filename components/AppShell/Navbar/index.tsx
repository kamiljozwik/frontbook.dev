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
      <Navbar.Section>Section 1</Navbar.Section>
      <Navbar.Section mt="md" id={configs.TOOLS_LIST_ID}>
        <Link href="/tools">
          <a>Tools</a>
        </Link>
      </Navbar.Section>
      <Navbar.Section grow mt="md">
        <Link href="/releases">
          <a>Releases</a>
        </Link>
      </Navbar.Section>
      <Navbar.Section>Section 3</Navbar.Section>
    </Navbar>
  );
};
