import {
  ActionIcon,
  createStyles,
  Group,
  useMantineColorScheme,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { Sun, MoonStars } from "tabler-icons-react";

import LogoLight from "../../../public/img/Logo4Light.png";
import LogoDark from "../../../public/img/Logo4Dark.png";

const useStyles = createStyles((theme) => ({
  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export const AppLogo = () => {
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <div className={classes.header}>
      <Group position="apart">
        <Link href="/">
          <Image src={dark ? LogoDark : LogoLight} alt="Logo" />
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
    </div>
  );
};
