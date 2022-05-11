import { FC, ReactNode, useState } from "react";
import { AppShell, useMantineTheme } from "@mantine/core";
import { Navigation } from "./Navbar";
import { AppFooter } from "./Footer";
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
      navbar={<Navigation opened={opened} />}
      footer={<AppFooter />}
      header={<AppHeader opened={opened} setOpened={setOpened} />}
    >
      {children}
    </AppShell>
  );
};

export { Shell };
