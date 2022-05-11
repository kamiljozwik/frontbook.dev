import { Navbar } from "@mantine/core";
import React from "react";

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
      <Navbar.Section grow mt="md">
        Section 2
      </Navbar.Section>
      <Navbar.Section>Section 3</Navbar.Section>
    </Navbar>
  );
};
