import "../styles/globals.css";
import { useState } from "react";
import type { AppProps } from "next/app";
import { useColorScheme } from "@mantine/hooks";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  MantineThemeOverride,
} from "@mantine/core";

import { Shell } from "../components/AppShell";
import { AppHead } from "../components/AppHead";
import { ToolsNavPortal } from "../components/AppShell/Navbar/ToolsNavPortal";

function MyApp({ Component, pageProps }: AppProps) {
  const preferredColorScheme = useColorScheme();

  const [colorScheme, setColorScheme] =
    useState<ColorScheme>(preferredColorScheme);

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const myTheme: MantineThemeOverride = {
    /** Put your mantine theme override here */
    colorScheme,
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider withGlobalStyles withNormalizeCSS theme={myTheme}>
        <AppHead />
        <Shell>
          <Component {...pageProps} />
        </Shell>
        {/* Make it better when migrating to Next.js 13 "app" folder */}
        <ToolsNavPortal categories={pageProps.categories} />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default MyApp;
