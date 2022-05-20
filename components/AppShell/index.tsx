import { FC, ReactNode, useState } from "react";
import { AppShell, useMantineTheme } from "@mantine/core";

import { Navigation } from "./Navbar";
import { AppHeader } from "./Header";

const Shell: FC<{ children: ReactNode }> = ({ children }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      header={<AppHeader opened={opened} setOpened={setOpened} />}
      navbar={<Navigation opened={opened} />}
    >
      {children}
    </AppShell>
  );
};

export { Shell };
