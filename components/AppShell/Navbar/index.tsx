import { Navbar } from "@mantine/core";

import { AddTool } from "./AddTool";
import { AppLogo } from "./AppLogo";

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
      <Navbar.Section>
        <AppLogo />
      </Navbar.Section>

      <Navbar.Section mt="md" grow id={configs.TOOLS_LIST_ID}>
        {/** Placeholder to mount navigation here via Portal */}
        <></>
      </Navbar.Section>

      <Navbar.Section>
        <AddTool />
      </Navbar.Section>
    </Navbar>
  );
};
