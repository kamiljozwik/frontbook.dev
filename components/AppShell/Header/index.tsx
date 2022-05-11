import React from "react";
import {
  Header,
  MediaQuery,
  Burger,
  ActionIcon,
  useMantineTheme,
  useMantineColorScheme,
  Group,
} from "@mantine/core";
import { Sun, MoonStars } from "tabler-icons-react";
import Link from "next/link";
import Image from "next/image";

import LogoLight from "../../../public/img/Logo4Light.png";
import LogoDark from "../../../public/img/Logo4Dark.png";

interface Props {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppHeader = ({ opened, setOpened }: Props) => {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <Header height={90} p="md">
      <Group align="center" position="apart">
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
        <Link href="/">
          <a>
            <Image src={dark ? LogoDark : LogoLight} alt="Logo" />
          </a>
        </Link>
        <ActionIcon
          variant="outline"
          color={dark ? "yellow" : "blue"}
          onClick={() => toggleColorScheme()}
          title="Toggle color scheme"
        >
          {dark ? <Sun size={18} /> : <MoonStars size={18} />}
        </ActionIcon>
      </Group>
    </Header>
  );
};
